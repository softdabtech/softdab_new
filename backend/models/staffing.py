from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


class StaffingRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(default="", max_length=150)
    roles: List[str] = Field(default_factory=list)
    engagement: str = Field(..., min_length=2, max_length=100)
    seniority: str = Field(..., min_length=2, max_length=50)
    duration: Optional[str] = Field(default="", max_length=100)
    startDate: Optional[str] = Field(default="", max_length=100)
    rate: Optional[str] = Field(default="", max_length=100)
    message: Optional[str] = Field(default="", max_length=5000)
    gdprConsent: bool = Field(..., description="GDPR consent required")
    website: Optional[str] = Field(default="", description="Honeypot field")
    page: Optional[str] = None
    referrer: Optional[str] = None
    userAgent: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
