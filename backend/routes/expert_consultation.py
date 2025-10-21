"""
Expert consultation route handler
"""
import json
import logging
import os
from datetime import datetime
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, Any
from database import save_expert_consultation, get_db_connection
from utils.emailer import send_email
from utils.timezone import to_local_time_str

def get_client_ip(request: Request) -> str:
    """Get client IP from request"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(',')[0].strip()
    return request.client.host if request.client else "unknown"

logger = logging.getLogger(__name__)
router = APIRouter()

FROM_EMAIL = os.getenv("FROM_EMAIL", "info@softdab.tech")
# Allow multiple recipients via env (comma-separated); default to existing address if unset
EXPERT_NOTIFY_EMAILS = [e.strip() for e in os.getenv("EXPERT_NOTIFICATION_EMAILS", "bombela@softdab.tech").split(',') if e.strip()]

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
NEW EXPERT CONSULTATION REQUEST

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

Consultation ID: {consultation_id}
IP Address: {consultation_data.get('ip_address', 'Unknown')}
User Agent: {consultation_data.get('user_agent', 'Unknown')}
Page URL: {consultation_data.get('page_url', 'Unknown')}
Submitted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        sent = await send_email(
            to_address="info@softdab.tech",
            subject=subject,
            content=email_body,
            from_address="noreply@softdab.tech"
        )
        if sent:
            logger.info(f"Expert consultation copy sent to info@softdab.tech")
            return True
        logger.error(f"Expert consultation copy NOT sent to info@softdab.tech")
        return False
    except Exception as e:
        logger.error(f"Error sending confirmation email: {e}")
        return False

@router.post("")
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
        email_sent_count = 0
        
        # Email to admin (info@softdab.tech)
        try:
            await send_expert_consultation_notification(consultation_data, routing_info, consultation_id)
            email_sent_count += 1
        except Exception as e:
            logger.error(f"Failed to send admin notification for consultation {consultation_id}: {e}")
        
        # Email to client (HTML)
        try:
            test_email = os.environ.get('EXPERT_TEST_EMAIL', None)
            client_to_address = test_email if test_email else consultation_data['email']
            client_subject = "Спасибо за обращение в SoftDAB!"
            client_html = f"""<html>
  <body style='font-family:Arial,sans-serif;background:#f9f9f9;padding:24px;'>
    <div style='max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:32px;box-shadow:0 2px 8px #eee;'>
      <h2 style='color:#1a73e8;'>Спасибо за обращение!</h2>
      <p>Уважаемый(ая) <b>{consultation_data['name']}</b>,<br>
      Мы получили вашу заявку на экспертную консультацию и свяжемся с вами в ближайшее время.<br><br>
      <b>Детали заявки:</b></p>
      <ul>
        <li><b>Компания:</b> {consultation_data.get('company', '')}</li>
        <li><b>Телефон:</b> {consultation_data.get('phone', '')}</li>
        <li><b>Сообщение:</b> {consultation_data['brief_message']}</li>
      </ul>
      <p style='color:#888;font-size:13px;'>SoftDAB | noreply@softdab.tech</p>
    </div>
  </body>
</html>"""
            
            sent_client = await send_email(
                to_address=client_to_address,
                subject=client_subject,
                content=client_html,
                from_address="noreply@softdab.tech"
            )
            if sent_client:
                logger.info(f"Expert consultation confirmation sent to client {client_to_address}")
                email_sent_count += 1
            else:
                logger.warning(f"Expert consultation confirmation NOT sent to client {client_to_address}")
        except Exception as e:
            logger.error(f"Failed to send expert consultation confirmation to client: {e}")
        
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

async def send_expert_consultation_confirmation(consultation_data: dict, routing_info: dict) -> bool:
    """Send confirmation copy of expert consultation to info@softdab.tech from noreply@softdab.tech"""
    try:
        subject = "Expert Consultation Confirmation (copy)"
        email_body = f"""
Expert Consultation Confirmation (copy)
Name: {consultation_data['name']}
Email: {consultation_data['email']}
Company: {consultation_data.get('company', 'Not provided')}
Brief Message: {consultation_data['brief_message']}
Priority: {consultation_data['priority']}/10
SLA: {routing_info['sla_hours']} hours
Submitted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        sent = await send_email(
            to_address="info@softdab.tech",
            subject=subject,
            content=email_body,
            from_address="noreply@softdab.tech"
        )
        if sent:
            logger.info("Expert consultation confirmation copy sent to info@softdab.tech")
            return True
        logger.error("Expert consultation confirmation copy NOT sent to info@softdab.tech")
        return False
    except Exception as e:
        logger.error(f"Error sending expert consultation confirmation copy: {e}")
        return False


@router.get("/{consultation_id}")
async def get_expert_consultation_detail(consultation_id: int):
    """Get full expert consultation details by ID for admin modal"""
    try:
        conn = get_db_connection()
        conn.row_factory = __import__('sqlite3').Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM expert_consultations WHERE id = ?", (consultation_id,))
        row = cursor.fetchone()
        columns = [description[0] for description in cursor.description]
        conn.close()
        if not row:
            raise HTTPException(status_code=404, detail="Consultation not found")
        data = dict(zip(columns, row))
        # Parse details blob to dict if present
        try:
            if data.get('details'):
                data['details'] = json.loads(data['details'])
        except Exception:
            pass
        if data.get('submitted_at'):
            data['submitted_at'] = to_local_time_str(data['submitted_at'])
        return data
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching expert consultation {consultation_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch consultation detail")