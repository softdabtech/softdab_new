"""
Contact form routes with SQLite integration and email notifications
"""
from fastapi import APIRouter, HTTPException, Request
from models.contact import ContactForm
from database import save_contact
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# SMTP Configuration (Zoho)
SMTP_HOST = os.environ.get('SMTP_HOST', 'smtp.zoho.eu')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_FROM_EMAIL = os.environ.get('SMTP_FROM_EMAIL', 'noreply@softdab.tech')
SMTP_FROM_NAME = os.environ.get('SMTP_FROM_NAME', 'SoftDAB Contact Form')
ZOHO_SMTP_USER = os.environ.get('ZOHO_SMTP_USER')
ZOHO_SMTP_PASS = os.environ.get('ZOHO_SMTP_PASS')

async def send_email(to_address: str, subject: str, content: str, from_address: str = None):
    """Send email via Zoho SMTP with SSL on port 465"""
    if from_address is None:
        from_address = SMTP_FROM_EMAIL
    
    if not ZOHO_SMTP_USER or not ZOHO_SMTP_PASS:
        logger.warning("SMTP credentials not configured, skipping email")
        return
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = f"{SMTP_FROM_NAME} <{from_address}>"
    msg['To'] = to_address
    
    # Add plain text part
    text_part = MIMEText(content, 'plain', 'utf-8')
    msg.attach(text_part)
    
    try:
        # Use Zoho SMTP with SSL on port 465
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=30) as server:
            server.login(ZOHO_SMTP_USER, ZOHO_SMTP_PASS)
            server.send_message(msg)
            logger.info(f"Email sent successfully to {to_address} via {SMTP_HOST}:{SMTP_PORT}")
    except Exception as e:
        logger.error(f"Failed to send email to {to_address}: {e}")
        raise

@router.post("/contact")
async def handle_contact(form_data: ContactForm, request: Request):
    """Handle contact form submission"""
    
    # Honeypot check
    if form_data.website:
        logger.warning(f"Honeypot triggered from {request.client.host}")
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
        logger.info(f"Contact form saved to database: {form_data.email}")
    else:
        logger.warning(f"Failed to save contact form to database: {form_data.email}")
        # Continue even if DB save fails
    
    # Prepare email content for team (sending to info@softdab.tech)
    team_content = f"""New Contact Form Submission

Name: {form_data.name}
Email: {form_data.email}
Company: {form_data.company}
Role: {form_data.role}
Service: {form_data.service}
Timeline: {form_data.timeline}
Budget: {form_data.budget}

Message:
{form_data.message}

GDPR Consent: Yes
Marketing Consent: {'Yes' if form_data.marketingConsent else 'No'}

IP Address: {request.client.host}
User Agent: {request.headers.get('user-agent', 'N/A')}
Timestamp: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}
"""

    # Prepare email content for client
    client_content = f"""Dear {form_data.name},

Thank you for contacting SoftDAB! We have received your message and our team will review it shortly.

Here's a copy of your submission:

Name: {form_data.name}
Company: {form_data.company}
Role: {form_data.role}
Service: {form_data.service}
Timeline: {form_data.timeline}
Budget: {form_data.budget}

Message:
{form_data.message}

We will get back to you within 24 hours.

Best regards,
The SoftDAB Team
https://softdab.tech
"""

    # Send emails
    email_sent_count = 0
    
    # Send notification to info@softdab.tech about new form submission
    try:
        await send_email(
            to_address='info@softdab.tech',
            subject=f'🔔 New Contact Form: {form_data.name} from {form_data.company}',
            content=team_content
        )
        logger.info("Notification email sent to info@softdab.tech")
        email_sent_count += 1
    except Exception as email_error:
        logger.error(f"Failed to send notification email to info@softdab.tech: {email_error}")
    
    # Send confirmation email to client
    try:
        await send_email(
            to_address=form_data.email,
            subject='Thank you for contacting SoftDAB!',
            content=client_content
        )
        logger.info(f"Confirmation email sent to client: {form_data.email}")
        email_sent_count += 1
    except Exception as email_error:
        logger.error(f"Failed to send confirmation email to {form_data.email}: {email_error}")
    
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



