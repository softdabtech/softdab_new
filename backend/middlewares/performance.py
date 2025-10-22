"""
Performance optimization middleware for FastAPI
"""
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import time
import gzip
from typing import Dict, Any
import json

class PerformanceMiddleware(BaseHTTPMiddleware):
    """Add performance timing headers"""
    
    async def dispatch(self, request, call_next):
        start_time = time.time()
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = str(round(process_time * 1000, 2))  # milliseconds
        response.headers["X-Response-Time"] = str(round(process_time, 6))  # seconds
        
        return response

class CompressionMiddleware(BaseHTTPMiddleware):
    """Handle gzip compression for API responses"""
    
    def __init__(self, app, minimum_size: int = 1024):
        super().__init__(app)
        self.minimum_size = minimum_size
    
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        
        # Check if client accepts gzip
        accept_encoding = request.headers.get("accept-encoding", "")
        if "gzip" not in accept_encoding.lower():
            return response
            
        # Only compress if response is large enough
        if hasattr(response, 'body') and len(response.body) < self.minimum_size:
            return response
            
        # Don't compress if already compressed
        if response.headers.get("content-encoding"):
            return response
            
        # Compress JSON responses  
        content_type = response.headers.get("content-type", "")
        if "application/json" in content_type:
            try:
                if hasattr(response, 'body'):
                    compressed_body = gzip.compress(response.body)
                    response.headers["content-encoding"] = "gzip"
                    response.headers["content-length"] = str(len(compressed_body))
                    response.body = compressed_body
            except Exception:
                pass  # If compression fails, return uncompressed
                
        return response

class CacheMiddleware(BaseHTTPMiddleware):
    """Simple in-memory cache for API responses"""
    
    def __init__(self, app, ttl: int = 300):  # 5 minutes default
        super().__init__(app)
        self.cache: Dict[str, Dict[str, Any]] = {}
        self.ttl = ttl
    
    def _get_cache_key(self, request) -> str:
        """Generate cache key from request"""
        return f"{request.method}:{request.url.path}:{request.url.query}"
    
    def _is_cacheable(self, request, response) -> bool:
        """Check if request/response should be cached"""
        # Only cache GET requests
        if request.method != "GET":
            return False
            
        # Only cache successful responses
        if response.status_code != 200:
            return False
            
        # Don't cache admin routes
        if "/admin/" in request.url.path:
            return False
            
        return True
    
    async def dispatch(self, request, call_next):
        cache_key = self._get_cache_key(request)
        current_time = time.time()
        
        # Check cache first
        if cache_key in self.cache:
            cached_entry = self.cache[cache_key]
            if current_time - cached_entry["timestamp"] < self.ttl:
                response = Response(
                    content=cached_entry["content"],
                    status_code=cached_entry["status_code"],
                    headers=cached_entry["headers"]
                )
                response.headers["X-Cache"] = "HIT"
                return response
            else:
                # Remove expired entry
                del self.cache[cache_key]
        
        # Get fresh response
        response = await call_next(request)
        
        # Cache if appropriate
        if self._is_cacheable(request, response):
            try:
                if hasattr(response, 'body'):
                    self.cache[cache_key] = {
                        "content": response.body,
                        "status_code": response.status_code,
                        "headers": dict(response.headers),
                        "timestamp": current_time
                    }
                    response.headers["X-Cache"] = "MISS"
            except Exception:
                pass  # If caching fails, continue without caching
        
        return response
