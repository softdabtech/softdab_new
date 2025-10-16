from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.contact import router as contact_router
import os

app = FastAPI(
    title="SoftDAB API",
    description="API for SoftDAB website",
    version="1.0.0",
)

# Настройка CORS
allowed_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:5175').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутер для контактной формы
app.include_router(contact_router, prefix="/api")

if __name__ == '__main__':
    import uvicorn
    port = int(os.environ.get('PORT', 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)
    to_address: EmailStr
    subject: str
    content: str
    from_address: EmailStr = SMTP_USER

def send_email(to_address: str, subject: str, content: str, from_address: str = SMTP_USER):
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
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(from_address, [to_address], msg.as_string())

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    # Honeypot
    if data.get('website'):
        return jsonify({'status': 'success'})

    # Письмо команде
    team_subject = f"New Contact Form: {data.get('name')} from {data.get('company')}"
    team_content = f"""
New contact form submission:

Name: {data.get('name')}
Email: {data.get('email')}
Company: {data.get('company')}
Role: {data.get('role')}
Service: {data.get('service')}
Timeline: {data.get('timeline')}
Budget: {data.get('budget')}
Message: {data.get('message')}
Marketing Consent: {'Yes' if data.get('marketingConsent') else 'No'}
"""
    send_email('info@softdab.tech', team_subject, team_content)

    # Письмо клиенту
    client_subject = 'Thank you for contacting SoftDAB!'
    client_content = f"""
Dear {data.get('name')},

Thank you for contacting SoftDAB! We have received your message and our team will review it shortly.

Here's a copy of your submission:
Name: {data.get('name')}
Company: {data.get('company')}
Role: {data.get('role')}
Service: {data.get('service')}
Timeline: {data.get('timeline')}
Budget: {data.get('budget')}
Message: {data.get('message')}

We will get back to you within 24 hours.

Best regards,
SoftDAB Team
"""
    send_email(data.get('email'), client_subject, client_content)

    return jsonify({'status': 'success'})
from fastapi import FastAPI, APIRouter, Request, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from middlewares.csrf import CSRFMiddleware
from middlewares.rate_limit import RateLimitMiddleware
from middlewares.security import SecurityHeadersMiddleware
from models.contact import ContactForm
import os
import logging
from pathlib import Path
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (optional)
mongo_url = os.environ.get('MONGO_URL')
db = None
if mongo_url:
    try:
        client = AsyncIOMotorClient(mongo_url)
        db = client[os.environ.get('DB_NAME', 'softdab')]
    except Exception as e:
        logging.warning(f"Failed to connect to MongoDB: {e}")

# Create the main app without a prefix
app = FastAPI(
    title="SoftDAB API",
    description="API for SoftDAB website",
    version="1.0.0",
    docs_url="/api/docs",  # Swagger UI
    redoc_url="/api/redoc",  # ReDoc UI
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# API routes
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

from routes.contact import router as contact_router
api_router.include_router(contact_router)

# Include the router in the main app
app.include_router(api_router)

# Настройка CORS
allowed_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "X-CSRF-Token"],
    expose_headers=["X-CSRF-Token"],
)

# Добавляем middlewares
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(CSRFMiddleware)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
