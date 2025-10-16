from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.contact import router as contact_router
from database import init_database, close_database
import os
import logging

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

# Настройка CORS
allowed_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:5175').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
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

# Подключаем роутер для контактной формы
app.include_router(contact_router, prefix="/api")

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "SoftDAB API is running", "version": "1.0.0", "database": "SQLite"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "database": "SQLite"}

if __name__ == '__main__':
    import uvicorn
    port = int(os.environ.get('PORT', 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)

