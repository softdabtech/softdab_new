import pytest
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from middlewares.rate_limit import RateLimitMiddleware
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_endpoint(request):
    """Helper endpoint function for tests"""
    return JSONResponse({"message": "success"})

@pytest.mark.asyncio
async def test_rate_limiting():    
    async def call_next(request):
        return JSONResponse({"message": "success"})
    
    request = type("Request", (), {
        "method": "GET",
        "url": "/test",
        "client": type("Client", (), {"host": "127.0.0.1"}),
        "headers": {},
        "scope": {"client": ("127.0.0.1", None)}
    })
    
    # Test request within limit
    middleware = RateLimitMiddleware(None)
    middleware.reset()  # Сбрасываем счетчик перед тестом
    
    response = await middleware.dispatch(request, call_next)
    # Проверяем первый запрос
    assert response.status_code == 200
    assert response.body == b'{"message":"success"}'
    
    # Make multiple requests to exceed limit
    responses = []
    for _ in range(101):  # 100 requests/minute limit + 1
        response = await middleware.dispatch(request, call_next)
        responses.append(response)
    
    # Check if the last request was rate limited
    last_response = responses[-1]
    assert last_response.status_code == 429
    assert last_response.body == b'{"detail":"Too many requests"}'
    assert "Retry-After" in last_response.headers
    
    # Reset счетчиков для следующих тестов
    middleware.reset()