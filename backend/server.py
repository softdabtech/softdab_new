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

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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

@api_router.post("/contact", response_model=ContactForm)
async def submit_contact(contact: ContactForm):
    contact_dict = contact.model_dump()
    result = await db.contacts.insert_one(contact_dict)
    contact_dict['id'] = str(result.inserted_id)
    return contact_dict

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
