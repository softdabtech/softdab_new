from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
import os

router = APIRouter()

# Настройки Zoho SMTP
SMTP_HOST = 'smtp.zoho.com'
SMTP_PORT = 587
SMTP_USER = os.environ.get('ZOHO_SMTP_USER', 'noreply@softdab.tech')
SMTP_PASS = os.environ.get('ZOHO_SMTP_PASS', '')

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    company: str
    role: str
    service: str
    timeline: str
    budget: str
    message: str
    gdprConsent: bool
    marketingConsent: bool = False

async def send_email(to_address: str, subject: str, content: str, from_address: str = SMTP_USER):
    msg = MIMEText(content)
    msg['Subject'] = subject
    msg['From'] = from_address
    msg['To'] = to_address
    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

@router.post("/contact")
async def handle_contact(form_data: ContactForm):
    # Формируем текст письма для команды
    team_content = f"""
    New Contact Form Submission
    
    Name: {form_data.name}
    Email: {form_data.email}
    Company: {form_data.company}
    Role: {form_data.role}
    Service: {form_data.service}
    Timeline: {form_data.timeline}
    Budget: {form_data.budget}
    
    Message:
    {form_data.message}
    
    GDPR Consent: {'Yes' if form_data.gdprConsent else 'No'}
    Marketing Consent: {'Yes' if form_data.marketingConsent else 'No'}
    """

    # Формируем текст письма для клиента
    client_content = f"""
    Dear {form_data.name},

    Thank you for contacting SoftDAB! We have received your message and our team will review it shortly.

    Here's a copy of your submission:
    Name: {form_data.name}
    Company: {form_data.company}
    Role: {form_data.role}
    Service: {form_data.service}
    Timeline: {form_data.timeline}
    Budget: {form_data.budget}
    Message: {form_data.message}

    We will get back to you within 24 hours.

    Best regards,
    SoftDAB Team
    """

    try:
        # Отправляем письмо команде
        await send_email('info@softdab.tech', f'New Contact Form: {form_data.name} from {form_data.company}', team_content)
        # Отправляем письмо клиенту
        await send_email(form_data.email, 'Thank you for contacting SoftDAB!', client_content)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    """Отправка уведомления о новой заявке"""
    try:
        # Email для команды
        team_msg = EmailMessage()
        team_msg.set_content(f"""
        New contact form submission:
        
        Name: {form_data.name}
        Email: {form_data.email}
        Company: {form_data.company}
        Role: {form_data.role}
        Service: {form_data.service}
        Timeline: {form_data.timeline}
        Budget: {form_data.budget}
        Message: {form_data.message}
        Marketing Consent: {"Yes" if form_data.marketingConsent else "No"}
        
        Page: {form_data.page}
        Referrer: {form_data.referrer}
        User Agent: {form_data.userAgent}
        Timestamp: {form_data.timestamp}
        """)

        team_msg['Subject'] = f'New Contact Form: {form_data.name} from {form_data.company}'
        team_msg['From'] = os.getenv('SMTP_FROM', 'noreply@softdab.tech')
        team_msg['To'] = os.getenv('NOTIFICATION_EMAIL', 'info@softdab.tech')

        # Email для клиента
        client_msg = EmailMessage()
        client_msg.set_content(f"""
        Dear {form_data.name},

        Thank you for contacting SoftDAB! We have received your message and our team will review it shortly.
        
        Here's a copy of your submission:
        
        Name: {form_data.name}
        Company: {form_data.company}
        Role: {form_data.role}
        Service: {form_data.service}
        Timeline: {form_data.timeline}
        Budget: {form_data.budget}
        Message: {form_data.message}
        
        We will get back to you within 24 hours.
        
        Best regards,
        SoftDAB Team
        """)

        client_msg['Subject'] = 'Thank you for contacting SoftDAB!'
        client_msg['From'] = os.getenv('SMTP_FROM', 'noreply@softdab.tech')
        client_msg['To'] = form_data.email

        # Асинхронная отправка email
        smtp_config = {
            'hostname': os.getenv('SMTP_HOST'),
            'port': int(os.getenv('SMTP_PORT', 587)),
            'username': os.getenv('SMTP_USER'),
            'password': os.getenv('SMTP_PASS'),
            'use_tls': True
        }

        # Отправка обоих писем
        async with aiosmtplib.SMTP(**smtp_config) as server:
            await server.send_message(team_msg)
            await server.send_message(client_msg)
        return True
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False



