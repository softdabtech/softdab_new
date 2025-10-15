import pytest
from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

def test_contact_form_submission():
    test_data = {
        "name": "Test User",
        "email": "test@example.com",
        "company": "Test Company",
        "role": "Developer",
        "service": "Web Development",
        "timeline": "1-3 months",
        "budget": "10k-50k",
        "message": "This is a test message",
        "marketingConsent": True,
        "page": "/contact",
        "referrer": "https://google.com",
        "userAgent": "Mozilla/5.0"
    }
    
    response = client.post("/contact", json=test_data)
    assert response.status_code == 200
    assert "success" in response.json()

def test_contact_form_validation():
    # Missing required fields
    test_data = {
        "name": "Test User",
        "email": "invalid-email"
    }
    
    response = client.post("/contact", json=test_data)
    assert response.status_code == 422  # Validation error

def test_contact_form_rate_limit():
    test_data = {
        "name": "Test User",
        "email": "test@example.com",
        "company": "Test Company",
        "role": "Developer",
        "service": "Web Development",
        "timeline": "1-3 months",
        "budget": "10k-50k",
        "message": "This is a test message"
    }
    
    # Make multiple requests to trigger rate limit
    for _ in range(6):
        response = client.post("/contact", json=test_data)
    
    assert response.status_code == 429  # Too many requests