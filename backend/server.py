from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
from dotenv import load_dotenv

# Load environment variables BEFORE importing database and routes

load_dotenv()

# Теперь используем относительные импорты для запуска из папки backend
from database import init_database, close_database
from routes.contact_resend import router as contact_router  # Using Resend API for email delivery
from routes.staffing import router as staffing_router
from routes.expert_consultation import router as expert_consultation_router
from routes.djinni import router as djinni_router

# Import security middleware
from middlewares.security import SecurityHeadersMiddleware
from middlewares.rate_limit import RateLimitMiddleware
from middlewares.csrf import CSRFMiddleware
from middlewares.performance import PerformanceMiddleware, CompressionMiddleware, CacheMiddleware

# Env already loaded above

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('logs/app.log', encoding='utf-8')
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="SoftDAB API",
    description="API for SoftDAB website with SQLite database",
    version="1.0.0",
)

# Настройка CORS - читаем из .env файла
cors_origins = os.getenv('CORS_ORIGINS', 'https://www.softdab.tech,https://softdab.tech').split(',')
logger.info(f"CORS origins: {cors_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Add middleware (order matters!)
app.add_middleware(PerformanceMiddleware)
app.add_middleware(CompressionMiddleware)
app.add_middleware(CacheMiddleware, ttl=300)  # 5 minutes cache
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RateLimitMiddleware)
# CSRF отключён для публичных форм - если нужен, применяйте только к защищённым роутам
# app.add_middleware(CSRFMiddleware)

# Event handlers
@app.on_event("startup")
async def startup_event():
    """Initialize SQLite database on startup"""
    await init_database()
    logger.info("Application started with SQLite database")

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    await close_database()
    logger.info("Application shutdown")

# Подключаем роутеры
app.include_router(contact_router, prefix="/api/contact")
app.include_router(staffing_router, prefix="/api/staffing")
app.include_router(expert_consultation_router, prefix="/api/expert-consultation")
app.include_router(djinni_router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "SoftDAB API is running", "version": "1.0.0", "database": "SQLite"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "database": "SQLite"}

@app.get("/api/health")
async def api_health_check():
    """API-prefixed health check for reverse proxy setups"""
    return {"status": "healthy", "database": "SQLite"}

if __name__ == '__main__':
    import uvicorn
    port = int(os.environ.get('PORT', 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)

