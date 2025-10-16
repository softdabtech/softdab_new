"""
Contact form routes with SQLite integration and SendGrid email API
"""
from fastapi import APIRouter, HTTPException, Request
from models.contact import ContactForm
from database import save_contact
from datetime import datetime
import os
import logging
import httpx

logger = logging.getLogger(__name__)
router = APIRouter()

# SendGrid Configuration
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')
SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
FROM_EMAIL = os.environ.get('FROM_EMAIL', 'info@softdab.tech')
FROM_NAME = os.environ.get('FROM_NAME', 'SoftDAB')

async def send_email_via_sendgrid(to_email: str, subject: str, content: str):
    """Send email via SendGrid API"""
    if not SENDGRID_API_KEY:
        logger.warning("SendGrid API key not configured")
        return False
    
    headers = {
        'Authorization': f'Bearer {SENDGRID_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        "personalizations": [{
            "to": [{"email": to_email}],
            "subject": subject
        }],
        "from": {
            "email": FROM_EMAIL,
            "name": FROM_NAME
        },
        "content": [{
            "type": "text/plain",
            "value": content
        }]
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                SENDGRID_API_URL,
                headers=headers,
                json=payload
            )
            
            if response.status_code == 202:
                logger.info(f"✅ Email sent successfully to {to_email} via SendGrid")
                return True
            else:
                logger.error(f"❌ SendGrid API error: {response.status_code} - {response.text}")
                return False
                
    except Exception as e:
        logger.error(f"❌ Failed to send email via SendGrid: {e}")
        return False

@router.post("/contact")
async def handle_contact(form_data: ContactForm, request: Request):
    """Handle contact form submission"""
    
    # Honeypot check
    if form_data.website:
        logger.warning(f"🤖 Honeypot triggered from {request.client.host}")
        return {"status": "success"}  # Return success to fool bots
    
    # Check GDPR consent
    if not form_data.gdprConsent:
        raise HTTPException(status_code=400, detail="GDPR consent is required")
    
    # Save to SQLite database
    contact_data = form_data.dict()
    contact_data['ip_address'] = request.client.host
    contact_data['user_agent'] = request.headers.get('user-agent')
    
    saved = await save_contact(contact_data)
    if saved:
        logger.info(f"💾 Contact form saved to database: {form_data.email}")
    else:
        logger.warning(f"⚠️ Failed to save contact form to database: {form_data.email}")
    
    # Prepare notification email for info@softdab.tech
    notification_content = f"""New Contact Form Submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Contact Information:
Name: {form_data.name}
Email: {form_data.email}
Company: {form_data.company}
Role: {form_data.role}

📊 Project Details:
Service: {form_data.service}
Timeline: {form_data.timeline}
Budget: {form_data.budget}

💬 Message:
{form_data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ GDPR Consent: Yes
📧 Marketing Consent: {'Yes' if form_data.marketingConsent else 'No'}

🌐 Technical Info:
IP Address: {request.client.host}
User Agent: {request.headers.get('user-agent', 'N/A')}
Timestamp: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}
"""

    # Prepare confirmation email for client
    client_content = f"""Dear {form_data.name},

Thank you for contacting SoftDAB!

We have received your message and our team will review it shortly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your Submission Details:

Name: {form_data.name}
Company: {form_data.company}
Role: {form_data.role}
Service: {form_data.service}
Timeline: {form_data.timeline}
Budget: {form_data.budget}

Message:
{form_data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We will get back to you within 24 hours.

Best regards,
The SoftDAB Team

🌐 https://softdab.tech
📧 info@softdab.tech
"""

    # Send emails
    email_sent_count = 0
    
    # 1. Send notification to info@softdab.tech
    if await send_email_via_sendgrid(
        to_email='info@softdab.tech',
        subject=f'🔔 New Contact Form: {form_data.name} from {form_data.company}',
        content=notification_content
    ):
        email_sent_count += 1
    
    # 2. Send confirmation to client
    if await send_email_via_sendgrid(
        to_email=form_data.email,
        subject='Thank you for contacting SoftDAB!',
        content=client_content
    ):
        email_sent_count += 1
    
    # Return appropriate response
    if saved:
        if email_sent_count == 2:
            return {
                "status": "success",
                "message": "Your message has been received successfully. We'll get back to you soon!"
            }
        elif email_sent_count > 0:
            return {
                "status": "success",
                "message": "Your message has been received. Some email notifications may be delayed."
            }
        else:
            return {
                "status": "success",
                "message": "Your message has been saved. We'll contact you shortly."
            }
    else:
        raise HTTPException(status_code=500, detail="Failed to process your request. Please try again later.")
