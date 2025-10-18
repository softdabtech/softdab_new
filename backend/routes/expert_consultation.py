"""
Expert consultation route handler
"""
import json
import logging
import httpx
import os
from datetime import datetime
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, Any
from database import save_expert_consultation

def get_client_ip(request: Request) -> str:
    """Get client IP from request"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(',')[0].strip()
    return request.client.host if request.client else "unknown"

logger = logging.getLogger(__name__)
router = APIRouter()

# Resend API configuration
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL", "info@softdab.tech")

# Pydantic models for validation
class StartupDetails(BaseModel):
    stage: Optional[str] = None
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    founders_count: Optional[int] = None
    target_markets: Optional[str] = None
    traction_metrics: Optional[str] = None
    tech_stack: Optional[str] = None
    nda_required: Optional[bool] = False

class ProductDetails(BaseModel):
    product_size: Optional[str] = None
    team_size: Optional[str] = None
    major_pain: Optional[str] = None
    current_stack: Optional[str] = None
    active_users: Optional[str] = None
    sla_requirements: Optional[str] = None
    compliance_needs: Optional[str] = None
    deployment_model: Optional[str] = None

class OutsourcingDetails(BaseModel):
    project_type: Optional[str] = None
    duration: Optional[str] = None
    budget_range: Optional[str] = None
    repo_access: Optional[bool] = False
    ci_cd: Optional[str] = None
    deliverables: Optional[str] = None
    acceptance_criteria: Optional[str] = None
    procurement_process: Optional[str] = None

class OutstaffDetails(BaseModel):
    roles_needed: Optional[str] = None
    start_date: Optional[str] = None
    engagement_length: Optional[str] = None
    interview_process: Optional[str] = None
    timezone_overlap: Optional[str] = None
    security_clearances: Optional[str] = None

class ExpertConsultationRequest(BaseModel):
    client_type: str = Field(..., description="Type of client: startup, product, outsourcing, outstaff")
    name: str = Field(..., description="Full name")
    email: EmailStr = Field(..., description="Email address")
    company: Optional[str] = None
    phone: Optional[str] = None
    brief_message: str = Field(..., description="Brief description of needs")
    consent: bool = Field(..., description="Privacy policy consent")
    website: Optional[str] = Field(default="", description="Honeypot field")
    
    # Type-specific details
    startup_details: Optional[StartupDetails] = None
    product_details: Optional[ProductDetails] = None
    outsourcing_details: Optional[OutsourcingDetails] = None
    outstaff_details: Optional[OutstaffDetails] = None
    
    # UTM and tracking
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    referrer: Optional[str] = None
    page_url: Optional[str] = None

def calculate_priority(client_type: str, details: Dict[str, Any]) -> int:
    """Calculate priority score (1-10) based on client type and details"""
    priority = 5  # Base priority
    
    if client_type == "startup":
        if details.get("budget_range") in ["100k-200k", "200k+"]:
            priority += 2
        if details.get("stage") == "growth":
            priority += 1
            
    elif client_type == "product":
        if details.get("product_size") == "Enterprise":
            priority += 3
        elif details.get("product_size") == "Growth":
            priority += 1
            
    elif client_type == "outsourcing":
        if details.get("budget_range") in ["200k-500k", "500k+"]:
            priority += 3
        elif details.get("budget_range") in ["100k-200k"]:
            priority += 2
            
    elif client_type == "outstaff":
        if details.get("roles_needed") and any(
            keyword in details.get("roles_needed", "").lower() 
            for keyword in ["senior", "lead", "architect"]
        ):
            priority += 2
    
    return min(priority, 10)

def get_routing_info(client_type: str, priority: int) -> Dict[str, Any]:
    """Get routing information based on client type and priority"""
    routing_config = {
        "startup": {
            "assigned_to": ["pre-sales", "PM"],
            "notification_email": "bombela@softdab.tech",
            "tags": ["startup", "mvp", "seed"],
            "sla_hours": 24
        },
        "product": {
            "assigned_to": ["Solutions Architect", "Account Exec"],
            "notification_email": "bombela@softdab.tech", 
            "tags": ["product", "roadmap", "integration"],
            "sla_hours": 24
        },
        "outsourcing": {
            "assigned_to": ["Delivery Lead", "Finance"],
            "notification_email": "bombela@softdab.tech",
            "tags": ["outsourcing", "fixed-price"],
            "sla_hours": 24
        },
        "outstaff": {
            "assigned_to": ["Staffing Lead"],
            "notification_email": "bombela@softdab.tech",
            "tags": ["team-extension", "long-term"],
            "sla_hours": 24
        }
    }
    
    config = routing_config.get(client_type, routing_config["startup"])
    
    # Adjust SLA based on priority
    if priority >= 8:
        config["sla_hours"] = 8
        config["tags"].append("high-priority")
    elif priority >= 7:
        config["tags"].append("priority")
    
    # Special handling for enterprise
    if client_type == "product" and priority >= 8:
        config["sla_hours"] = 4
        config["tags"].append("enterprise")
    
    if client_type == "outsourcing" and priority >= 8:
        config["assigned_to"].append("Enterprise Sales")
        config["tags"].append("enterprise-sales")
    
    return config

async def send_expert_consultation_notification(consultation_data: dict, routing_info: dict, consultation_id: int):
    """Send email notification about new expert consultation"""
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured - email notification skipped")
        return False
    
    try:
        # Format details for email
        details = json.loads(consultation_data.get('details', '{}')) if consultation_data.get('details') else {}
        details_text = ""
        
        if details:
            details_text = "\n\n=== ADDITIONAL DETAILS ===\n"
            for key, value in details.items():
                if value:
                    formatted_key = key.replace('_', ' ').title()
                    details_text += f"{formatted_key}: {value}\n"
        
        # UTM tracking info
        utm_info = ""
        if consultation_data.get('utm_source') or consultation_data.get('utm_medium'):
            utm_info = f"\n\n=== TRACKING INFO ===\n"
            if consultation_data.get('utm_source'):
                utm_info += f"UTM Source: {consultation_data['utm_source']}\n"
            if consultation_data.get('utm_medium'):
                utm_info += f"UTM Medium: {consultation_data['utm_medium']}\n"
            if consultation_data.get('utm_campaign'):
                utm_info += f"UTM Campaign: {consultation_data['utm_campaign']}\n"
            if consultation_data.get('referrer'):
                utm_info += f"Referrer: {consultation_data['referrer']}\n"
        
        # Email content
        subject = f"[EXPERT CONSULTATION] {consultation_data['client_type'].upper()} — {consultation_data.get('company', consultation_data['name'])} — Priority {consultation_data['priority']}/10"
        
        email_body = f"""
🎯 NEW EXPERT CONSULTATION REQUEST

=== BASIC INFO ===
Type: {consultation_data['client_type'].upper()}
Name: {consultation_data['name']}
Email: {consultation_data['email']}
Company: {consultation_data.get('company', 'Not provided')}
Phone: {consultation_data.get('phone', 'Not provided')}

Brief Message:
{consultation_data['brief_message']}

=== ROUTING INFO ===
Priority: {consultation_data['priority']}/10
Assigned To: {', '.join(routing_info['assigned_to'])}
SLA: {routing_info['sla_hours']} hours
Tags: {', '.join(routing_info['tags'])}
{details_text}{utm_info}
=== SYSTEM INFO ===
Consultation ID: {consultation_id}
IP Address: {consultation_data.get('ip_address', 'Unknown')}
User Agent: {consultation_data.get('user_agent', 'Unknown')}
Page URL: {consultation_data.get('page_url', 'Unknown')}
Submitted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---
Reply to this consultation at: https://softdab.tech/admin
"""

        # Send notification email
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": FROM_EMAIL,
                    "to": ["bombela@softdab.tech"],
                    "subject": subject,
                    "text": email_body
                }
            )
            
            if response.status_code == 200:
                logger.info(f"Notification email sent for consultation {consultation_id}")
                return True
            else:
                logger.error(f"Failed to send notification email: {response.status_code} - {response.text}")
                return False
                
    except Exception as e:
        logger.error(f"Error sending notification email: {e}")
        return False

async def send_expert_consultation_confirmation(consultation_data: dict, routing_info: dict):
    """Send confirmation email to the user"""
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured - confirmation email skipped")
        return False
    
    try:
        subject = "Thanks for reaching out to SoftDAB — We received your expert consultation request"
        
        email_body = f"""
Hi {consultation_data['name']},

Thank you for reaching out to SoftDAB for expert consultation!

We've successfully received your {consultation_data['client_type']} inquiry and our team is already reviewing it. Based on your requirements, we've assigned this to our {', '.join(routing_info['assigned_to'])} team.

NEXT STEPS:
• Our experts will review your requirements within {routing_info['sla_hours']} hours
• You'll receive a detailed response via email
• We may schedule a discovery call to better understand your needs

YOUR REQUEST SUMMARY:
{consultation_data['brief_message']}

If you have any urgent questions in the meantime, feel free to reach out to us directly at bombela@softdab.tech.

Best regards,
The SoftDAB Team

---
This is an automated confirmation. Please do not reply to this email.
"""

        # Send confirmation email
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": FROM_EMAIL,
                    "to": [consultation_data['email']],
                    "subject": subject,
                    "text": email_body
                }
            )
            
            if response.status_code == 200:
                logger.info(f"Confirmation email sent to {consultation_data['email']}")
                return True
            else:
                logger.error(f"Failed to send confirmation email: {response.status_code} - {response.text}")
                return False
                
    except Exception as e:
        logger.error(f"Error sending confirmation email: {e}")
        return False

@router.post("/expert-consultation")
async def submit_expert_consultation(
    request: ExpertConsultationRequest,
    http_request: Request
):
    """Submit expert consultation form"""
    try:
        # Honeypot check
        if request.website:
            logger.warning(f"Honeypot triggered for {request.email}")
            return {"success": True, "message": "Thank you for your submission!"}
        
        # Get client IP and user agent
        client_ip = get_client_ip(http_request)
        user_agent = http_request.headers.get("user-agent", "")
        
        # Get type-specific details
        details = {}
        if request.client_type == "startup" and request.startup_details:
            details = request.startup_details.dict()
        elif request.client_type == "product" and request.product_details:
            details = request.product_details.dict()
        elif request.client_type == "outsourcing" and request.outsourcing_details:
            details = request.outsourcing_details.dict()
        elif request.client_type == "outstaff" and request.outstaff_details:
            details = request.outstaff_details.dict()
        
        # Calculate priority
        priority = calculate_priority(request.client_type, details)
        
        # Get routing information
        routing_info = get_routing_info(request.client_type, priority)
        
        # Prepare data for database
        consultation_data = {
            "client_type": request.client_type,
            "name": request.name,
            "email": request.email,
            "company": request.company,
            "phone": request.phone,
            "brief_message": request.brief_message,
            "consent": request.consent,
            "details": json.dumps(details) if details else None,
            "priority": priority,
            "ip_address": client_ip,
            "user_agent": user_agent,
            "page_url": request.page_url,
            "referrer": request.referrer,
            "utm_source": request.utm_source,
            "utm_medium": request.utm_medium,
            "utm_campaign": request.utm_campaign
        }
        
        # Save to database
        consultation_id = await save_expert_consultation(consultation_data)
        
        # Send email notifications
        try:
            await send_expert_consultation_notification(consultation_data, routing_info, consultation_id)
            await send_expert_consultation_confirmation(consultation_data, routing_info)
        except Exception as e:
            logger.error(f"Failed to send emails for consultation {consultation_id}: {e}")
            # Don't fail the request if email sending fails
        
        logger.info(f"Expert consultation submitted: {request.email} (Priority: {priority})")
        
        return {
            "success": True,
            "message": f"Thank you! We've received your request and will respond within {routing_info['sla_hours']} hours.",
            "consultation_id": consultation_id,
            "priority": priority,
            "sla_hours": routing_info['sla_hours'],
            "assigned_to": routing_info['assigned_to'],
            "tags": routing_info['tags']
        }
        
    except Exception as e:
        logger.error(f"Failed to submit expert consultation: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")