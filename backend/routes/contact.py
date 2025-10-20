"""
Contact form routes with SQLite integration and Resend email API
"""
from fastapi import APIRouter, HTTPException, Request
from models.contact import ContactForm
from database import save_contact, get_db_connection
from datetime import datetime
import os
import smtplib
from email.mime.text import MIMEText
import logging
import httpx
import sqlite3

logger = logging.getLogger(__name__)
router = APIRouter()

# Resend API Configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
RESEND_API_URL = 'https://api.resend.com/emails'
FROM_EMAIL = os.environ.get('FROM_EMAIL', 'info@softdab.tech')
FROM_NAME = os.environ.get('FROM_NAME', 'SoftDAB')

async def send_email(to_address: str, subject: str, content: str, from_address: str = None):
    """Send email via Resend API"""
    if not RESEND_API_KEY:
        logger.warning("Resend API key not configured, attempting SMTP fallback")
        # SMTP fallback using local MTA or configured relay
        try:
            msg = MIMEText(content)
            msg['Subject'] = subject
            msg['From'] = from_address or f"{FROM_NAME} <{FROM_EMAIL}>"
            msg['To'] = to_address

            # Use localhost SMTP relay; if you have creds, configure via env
            smtp_host = os.environ.get('SMTP_HOST', 'localhost')
            smtp_port = int(os.environ.get('SMTP_PORT', '25'))
            smtp_user = os.environ.get('SMTP_USER')
            smtp_pass = os.environ.get('SMTP_PASS')
            use_tls = os.environ.get('SMTP_TLS', 'false').lower() == 'true'

            server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
            try:
                if use_tls:
                    server.starttls()
                if smtp_user and smtp_pass:
                    server.login(smtp_user, smtp_pass)
                server.sendmail(msg['From'], [to_address], msg.as_string())
            finally:
                server.quit()

            logger.info(f"✅ Email sent via SMTP to {to_address}")
            return True
        except Exception as e:
            logger.error(f"❌ SMTP fallback failed: {e}")
            return False
    
    if from_address is None:
        from_address = f"{FROM_NAME} <{FROM_EMAIL}>"
    
    headers = {
        'Authorization': f'Bearer {RESEND_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        "from": from_address,
        "to": [to_address],
        "subject": subject,
        "text": content
    }
    
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                RESEND_API_URL,
                headers=headers,
                json=payload
            )
            
            if response.status_code == 200:
                logger.info(f"✅ Email sent successfully to {to_address} via Resend")
                return True
            else:
                logger.error(f"❌ Resend API error: {response.status_code} - {response.text}")
                return False
                
    except Exception as e:
        logger.error(f"❌ Failed to send email via Resend: {e}")
        return False

@router.post("")
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
        sent = await send_email(
            to_address='info@softdab.tech',
            subject=f'🔔 New Contact Form: {form_data.name} from {form_data.company}',
            content=team_content
        )
        if sent:
            logger.info("Notification email sent to info@softdab.tech")
            email_sent_count += 1
        else:
            logger.warning("Notification email NOT sent (provider returned False)")
    except Exception as email_error:
        logger.error(f"Failed to send notification email to info@softdab.tech: {email_error}")
    
    # Send confirmation email to client
    try:
        sent = await send_email(
            to_address=form_data.email,
            subject='Thank you for contacting SoftDAB!',
            content=client_content
        )
        if sent:
            logger.info(f"Confirmation email sent to client: {form_data.email}")
            email_sent_count += 1
        else:
            logger.warning(f"Confirmation email to {form_data.email} NOT sent (provider returned False)")
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


@router.get("")
async def get_contacts():
    """Get all contact form submissions"""
    try:
        conn = get_db_connection()
        conn.row_factory = sqlite3.Row  # Enable dict-like access
        cursor = conn.cursor()
        
        # Get all contacts ordered by date descending
        cursor.execute("""
            SELECT id, name, email, company, message, submitted_at, status 
            FROM contacts 
            ORDER BY submitted_at DESC
        """)
        
        contacts = []
        rows = cursor.fetchall()
        logger.info(f"Found {len(rows)} contacts in database")
        
        for row in rows:
            contacts.append({
                "id": row[0],
                "name": row[1],
                "email": row[2],
                "company": row[3],
                "message": row[4][:100] + "..." if len(row[4]) > 100 else row[4],  # Truncate long messages
                "date": row[5],
                "status": row[6] or "new"
            })
        
        conn.close()
        logger.info(f"Returning {len(contacts)} contacts")
        return contacts
        
    except Exception as e:
        logger.error(f"Error fetching contacts: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch contacts: {str(e)}")


@router.get("/{contact_id}")
async def get_contact_detail(contact_id: int):
    """Get full contact details by ID for admin modal"""
    try:
        conn = get_db_connection()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,))
        row = cursor.fetchone()
        conn.close()
        if not row:
            raise HTTPException(status_code=404, detail="Contact not found")
        columns = [description[0] for description in cursor.description]
        return dict(zip(columns, row))
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact {contact_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch contact: {str(e)}")



