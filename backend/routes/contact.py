"""
Contact form routes with SQLite integration and email notifications
"""
from fastapi import APIRouter, HTTPException, Request
from models.contact import ContactForm
from database import save_contact, get_db_connection
from datetime import datetime
import logging
import sqlite3
import os
from utils.emailer import send_email
from utils.timezone import to_local_time_str

logger = logging.getLogger(__name__)
router = APIRouter()

FROM_EMAIL = os.environ.get('FROM_EMAIL', 'info@softdab.tech')
FROM_NAME = os.environ.get('FROM_NAME', 'SoftDAB')
# Allow multiple notification recipients via env (comma‑separated)
NOTIFY_EMAILS = [e.strip() for e in os.environ.get('CONTACT_NOTIFICATION_EMAILS', 'info@softdab.tech').split(',') if e.strip()]

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
    

    # Prepare email content (копия формы)
    form_copy = f"""Contact Form Submission
Name: {form_data.name}
Email: {form_data.email}
Company: {form_data.company}
Role: {form_data.role}
Service: {form_data.service}
Timeline: {form_data.timeline}
Budget: {form_data.budget}
Message: {form_data.message}
GDPR Consent: Yes
Marketing Consent: {'Yes' if form_data.marketingConsent else 'No'}
IP Address: {request.client.host}
User Agent: {request.headers.get('user-agent', 'N/A')}
Timestamp: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}
"""

    # Send emails
    email_sent_count = 0
    

    # Отправляем копию формы только на info@softdab.tech
    try:
        sent = await send_email(
            to_address="info@softdab.tech",
            subject=f'Contact Form: {form_data.name} from {form_data.company}',
            content=form_copy,
            from_address="noreply@softdab.tech"
        )
        if sent:
            logger.info(f"Contact form copy sent to info@softdab.tech")
            email_sent_count += 1
        else:
            logger.warning(f"Contact form copy NOT sent to info@softdab.tech")
    except Exception as email_error:
        logger.error(f"Failed to send contact form copy: {email_error}")
    
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
            msg = row[4] or ""
            contacts.append({
                "id": row[0],
                "name": row[1],
                "email": row[2],
                "company": row[3],
                "message": (msg[:100] + "...") if len(msg) > 100 else msg,  # Truncate long messages
                "date": to_local_time_str(row[5]),
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
        columns = [description[0] for description in cursor.description]
        conn.close()
        if not row:
            raise HTTPException(status_code=404, detail="Contact not found")
        data = dict(zip(columns, row))
        # Convert timestamp to local timezone string
        if data.get('submitted_at'):
            data['submitted_at'] = to_local_time_str(data['submitted_at'])
        return data
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact {contact_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch contact: {str(e)}")



