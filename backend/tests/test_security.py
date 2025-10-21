import pytest
from fastapi.testclient import TestClient
from server import app
from datetime import datetime, timedelta
import json

client = TestClient(app)

def test_cors_headers():
    """Проверяем CORS заголовки"""
    response = client.options("/api/health", headers={
        "Origin": "http://localhost:3000",
        "Access-Control-Request-Method": "GET"
    })
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"
    assert response.headers["access-control-allow-methods"]

def test_rate_limiting():
    """Проверяем Rate Limiting"""
    # Делаем множество запросов
    for _ in range(100):
        response = client.get("/api/health")
        assert response.status_code == 200

    # 101-й запрос должен быть заблокирован
    response = client.get("/api/health")
    assert response.status_code == 429
    assert "Too many requests" in response.json()["detail"]

def test_security_headers():
    """Проверяем заголовки безопасности"""
    response = client.get("/api/health")
    headers = response.headers

    # Проверяем основные заголовки безопасности
    assert headers["X-Frame-Options"] == "DENY"
    assert headers["X-Content-Type-Options"] == "nosniff"
    assert headers["Referrer-Policy"]
    assert headers["X-XSS-Protection"]
    assert headers["Strict-Transport-Security"]
    assert headers["Content-Security-Policy"]

def test_csrf_protection():
    """Проверяем CSRF защиту"""
    # Запрос без CSRF токена
    response = client.post("/api/contact", json={
        "name": "Test User",
        "email": "test@company.com"
    })
    assert response.status_code == 403
    assert "Invalid CSRF token" in response.json()["detail"]

    # Получаем CSRF токен
    response = client.get("/api/health")
    csrf_token = response.cookies.get("csrf_token")
    
    # Запрос с CSRF токеном
    response = client.post(
        "/api/contact",
        headers={"X-CSRF-Token": csrf_token},
        json={
            "name": "Test User",
            "email": "test@company.com"
        }
    )
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_data_retention():
    """Проверяем политику хранения данных"""
    from middlewares.data_retention import DataRetentionPolicy
    
    # Создаем тестовые данные
    old_data = {
        "email": "test@example.com",
        "name": "Test User",
        "timestamp": datetime.utcnow() - timedelta(days=400)
    }
    
    # Проверяем очистку старых данных
    policy = DataRetentionPolicy(app.db)
    await policy.cleanup_expired_data()
    
    # Старые данные должны быть удалены
    result = await app.db.contacts.find_one({"email": "test@example.com"})
    assert result is None