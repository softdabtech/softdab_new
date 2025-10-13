"""
API endpoints для обработки контактной формы
"""
from fastapi import APIRouter, HTTPException, Request, Depends
from ..models.contact import ContactForm
from ..middlewares.csrf import validate_csrf_token
from ..middlewares.rate_limit import rate_limiter
from ..middlewares.security import sanitize_input
import aiosmtplib
from email.message import EmailMessage
import os
import json
from datetime import datetime

router = APIRouter()

async def send_notification_email(form_data: ContactForm):
    """Отправка уведомления о новой заявке"""
    try:
        msg = EmailMessage()
        msg.set_content(f"""
        New contact form submission:
        
        Name: {form_data.name}
        Email: {form_data.email}
        Company: {form_data.company}
        Role: {form_data.role}
        Service: {form_data.service}
        Timeline: {form_data.timeline}
        Budget: {form_data.budget}
        Message: {form_data.message}
        
        Page: {form_data.page}
        Referrer: {form_data.referrer}
        User Agent: {form_data.userAgent}
        Timestamp: {form_data.timestamp}
        """)

        msg['Subject'] = f'New Contact Form: {form_data.name} from {form_data.company}'
        msg['From'] = os.getenv('SMTP_FROM', 'noreply@softdab.tech')
        msg['To'] = os.getenv('NOTIFICATION_EMAIL', 'hello@softdab.tech')

        # Асинхронная отправка email
        await aiosmtplib.send(
            msg,
            hostname=os.getenv('SMTP_HOST'),
            port=int(os.getenv('SMTP_PORT', 587)),
            username=os.getenv('SMTP_USER'),
            password=os.getenv('SMTP_PASS'),
            use_tls=True
        )
        return True
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False

async def save_to_file(form_data: ContactForm):
    """Сохранение заявки в файл"""
    try:
        data = json.loads(form_data.json())
        data['timestamp'] = data['timestamp'].isoformat()
        
        filename = f"contacts_{datetime.now().strftime('%Y%m')}.json"
        filepath = f"data/contacts/{filename}"
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        existing_data = []
        if os.path.exists(filepath):
            with open(filepath, 'r') as f:
                existing_data = json.load(f)
                
        existing_data.append(data)
        
        with open(filepath, 'w') as f:
            json.dump(existing_data, f, indent=2)
            
        return True
    except Exception as e:
        print(f"Failed to save data: {str(e)}")
        return False

@router.post("/api/contact")
async def submit_contact_form(
    request: Request,
    form_data: ContactForm,
    csrf_valid: bool = Depends(validate_csrf_token),
    rate_limit: bool = Depends(rate_limiter)
):
    """
    Обработка отправки контактной формы
    """
    try:
        # Очистка входящих данных
        cleaned_data = sanitize_input(form_data.dict())
        form_data = ContactForm(**cleaned_data)
        
        # Сохранение данных
        saved = await save_to_file(form_data)
        if not saved:
            raise HTTPException(status_code=500, detail="Failed to save data")
            
        # Отправка уведомления
        email_sent = await send_notification_email(form_data)
        if not email_sent:
            print("Warning: Failed to send notification email")
            
        return {
            "message": "Form submitted successfully",
            "id": form_data.id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))