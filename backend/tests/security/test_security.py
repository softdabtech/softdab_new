import pytest
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from middlewares.security import SecurityHeadersMiddleware
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_endpoint(request):
    """Helper endpoint function for tests"""
    return JSONResponse({"message": "success"})

@pytest.mark.asyncio
async def test_security_headers():
    app = Starlette(
        routes=[Route("/test", test_endpoint)],
        middleware=[SecurityHeadersMiddleware]
    )
    
    async def call_next(request):
        return JSONResponse({"message": "success"})
    
    middleware = SecurityHeadersMiddleware(app)
    request = type("Request", (), {"method": "GET", "url": "/test"})
    response = await middleware.dispatch(request, call_next)
    
    # Test security headers
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-XSS-Protection"] == "1; mode=block"
    assert response.headers["Strict-Transport-Security"] == "max-age=31536000; includeSubDomains"
    assert response.headers["Referrer-Policy"] == "strict-origin-when-cross-origin"
    
    # Test Content Security Policy
    csp = response.headers["Content-Security-Policy"]
    assert "default-src 'self'" in csp
    assert "script-src 'self' 'unsafe-inline' 'unsafe-eval'" in csp
    assert "style-src 'self' 'unsafe-inline'" in csp
    assert "img-src 'self' data: https:" in csp
    assert "font-src 'self' data:" in csp
    assert "connect-src 'self'" in csp