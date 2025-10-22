"""
Performance optimization middleware for FastAPI
"""
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import time
import gzip
import json
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class PerformanceMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.cache: Dict[str, Any] = {}
        self.cache_ttl = 300  # 5 minutes
        
    async def dispatch(self, request, call_next):
        start_time = time.time()
        
        # Add timing header
        response = await call_next(request)
        process_time = time.time() - start_time
        
        if hasattr(response, 'headers'):
            response.headers["X-Process-Time"] = str(process_time)
            
            # Add performance headers
            response.headers["X-Content-Type-Options"] = "nosniff"
            response.headers["X-Frame-Options"] = "DENY"
            
        # Log slow requests
        if process_time > 1.0:
            logger.warning(f"Slow request: {request.url.path} took {process_time:.3f}s")
            
        return response

class CompressionMiddleware(BaseHTTPMiddleware):
    """Gzip compression middleware"""
    
    def __init__(self, app, minimum_size: int = 1024):
        super().__init__(app)
        self.minimum_size = minimum_size
        
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        
        # Check if client accepts gzip
        accept_encoding = request.headers.get("accept-encoding", "")
        if "gzip" not in accept_encoding.lower():
            return response
            
        # Check content type
        content_type = response.headers.get("content-type", "")
        if not self._should_compress(content_type):
            return response
            
        # Get response body
        if hasattr(response, 'body'):
            body = response.body
            if len(body) < self.minimum_size:
                return response
                
            # Compress body
            compressed_body = gzip.compress(body)
            
            # Update response
            response.headers["content-encoding"] = "gzip"
            response.headers["content-length"] = str(len(compressed_body))
            response.body = compressed_body
            
        return response
        
    def _should_compress(self, content_type: str) -> bool:
        compressible_types = [
            "application/json",
            "text/html",
            "text/css",
            "text/javascript",
            "application/javascript",
            "text/xml",
            "application/xml",
        ]
        return any(ct in content_type for ct in compressible_types)

class CacheMiddleware(BaseHTTPMiddleware):
    """Simple in-memory cache for GET requests"""
    
    def __init__(self, app, ttl: int = 300):
        super().__init__(app)
        self.cache: Dict[str, Dict[str, Any]] = {}
        self.ttl = ttl
        
    async def dispatch(self, request, call_next):
        # Only cache GET requests
        if request.method != "GET":
            return await call_next(request)
            
        # Generate cache key
        cache_key = f"{request.url.path}?{request.url.query}"
        
        # Check cache
        if cache_key in self.cache:
            cached_item = self.cache[cache_key]
            if time.time() - cached_item["timestamp"] < self.ttl:
                logger.info(f"Cache hit: {cache_key}")
                cached_response = cached_item["response"]
                return Response(
                    content=cached_response["content"],
                    status_code=cached_response["status_code"],
                    headers={**cached_response["headers"], "X-Cache": "HIT"}
                )
        
        # Get response
        response = await call_next(request)
        
        # Cache successful responses
        if response.status_code == 200 and hasattr(response, 'body'):
            self.cache[cache_key] = {
                "timestamp": time.time(),
                "response": {
                    "content": response.body,
                    "status_code": response.status_code,
                    "headers": dict(response.headers)
                }
            }
            if hasattr(response, 'headers'):
                response.headers["X-Cache"] = "MISS"
                
        # Clean old cache entries
        self._cleanup_cache()
        
        return response
        
    def _cleanup_cache(self):
        """Remove expired cache entries"""
        current_time = time.time()
        expired_keys = [
            key for key, item in self.cache.items()
            if current_time - item["timestamp"] > self.ttl
        ]
        for key in expired_keys:
            del self.cache[key]

class DatabaseOptimizationMiddleware(BaseHTTPMiddleware):
    """Database connection and query optimization"""
    
    async def dispatch(self, request, call_next):
        # Add database connection timeout
        start_time = time.time()
        response = await call_next(request)
        db_time = time.time() - start_time
        
        if hasattr(response, 'headers'):
            response.headers["X-DB-Time"] = str(db_time)
            
        # Log slow database queries
        if db_time > 0.5:
            logger.warning(f"Slow DB query: {request.url.path} took {db_time:.3f}s")
            
        return response