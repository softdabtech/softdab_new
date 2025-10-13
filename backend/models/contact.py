"""
Модели данных для API
"""
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: str = Field(..., min_length=2, max_length=100)
    role: str = Field(..., min_length=2, max_length=100)
    service: str = Field(..., min_length=1)
    timeline: str = Field(..., min_length=1)
    budget: str = Field(..., min_length=1)
    message: str = Field(..., min_length=20, max_length=5000)
    gdprConsent: bool = Field(..., description="GDPR consent")
    marketingConsent: bool = Field(default=False, description="Marketing consent")
    website: str = Field(default="", description="Honeypot field")
    gdprConsent: bool = Field(..., description="GDPR consent")
    marketingConsent: bool = Field(default=False, description="Marketing consent")
    website: Optional[str] = Field(default="", description="Honeypot field")
    page: Optional[str] = None
    referrer: Optional[str] = None
    userAgent: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john.doe@company.com",
                "company": "Company Inc",
                "role": "CTO",
                "service": "Web Development",
                "timeline": "1-3 months",
                "budget": "€25,000 - €50,000",
                "message": "We need a new web application..."
            }
        }