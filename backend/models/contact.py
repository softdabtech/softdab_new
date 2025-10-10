"""
Модели данных для API
"""
from pydantic import BaseModel, Field, EmailStr, constr
from typing import Optional
from datetime import datetime
import uuid

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: constr(min_length=2, max_length=100)
    email: EmailStr
    company: constr(min_length=2, max_length=100)
    role: constr(min_length=2, max_length=100)
    service: constr(min_length=1)
    timeline: constr(min_length=1)
    budget: constr(min_length=1)
    message: constr(min_length=20, max_length=5000)
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