from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.contact import router as contact_router
from routes.expert_consultation import router as expert_consultation_router
from database import init_database, close_database
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
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
app.include_router(expert_consultation_router, prefix="/api/expert-consultation")

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

