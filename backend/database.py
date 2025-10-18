"""
SQLite database configuration and connection
"""
import aiosqlite
import sqlite3
import os
import logging
from pathlib import Path
from datetime import datetime

logger = logging.getLogger(__name__)

# Database file path
DB_DIR = Path(os.environ.get('DB_DIR', '/var/www/softdab/backend/data'))
DB_FILE = DB_DIR / 'contacts.db'

class Database:
    connection: aiosqlite.Connection = None

database = Database()

async def init_database():
    """Initialize SQLite database and create tables"""
    try:
        # Create data directory if it doesn't exist
        DB_DIR.mkdir(parents=True, exist_ok=True)
        
        # Connect to database
        database.connection = await aiosqlite.connect(str(DB_FILE))
        
        # Enable foreign keys
        await database.connection.execute("PRAGMA foreign_keys = ON")
        
        # Create contacts table
        await database.connection.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                company TEXT NOT NULL,
                role TEXT NOT NULL,
                service TEXT NOT NULL,
                timeline TEXT NOT NULL,
                budget TEXT NOT NULL,
                message TEXT NOT NULL,
                gdpr_consent BOOLEAN NOT NULL,
                marketing_consent BOOLEAN DEFAULT 0,
                ip_address TEXT,
                user_agent TEXT,
                page TEXT,
                referrer TEXT,
                status TEXT DEFAULT 'new',
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create expert_consultations table for multi-step form
        await database.connection.execute("""
            CREATE TABLE IF NOT EXISTS expert_consultations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                client_type TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                company TEXT,
                phone TEXT,
                brief_message TEXT NOT NULL,
                consent BOOLEAN NOT NULL,
                details TEXT,
                priority INTEGER DEFAULT 5,
                status TEXT DEFAULT 'new',
                ip_address TEXT,
                user_agent TEXT,
                page_url TEXT,
                referrer TEXT,
                utm_source TEXT,
                utm_medium TEXT,
                utm_campaign TEXT,
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        await database.connection.commit()
        logger.info(f"SQLite database initialized at {DB_FILE}")
        
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        raise

async def close_database():
    """Close database connection"""
    if database.connection:
        await database.connection.close()
        logger.info("Closed database connection")

async def save_contact(contact_data: dict):
    """Save contact form submission to database"""
    try:
        await database.connection.execute("""
            INSERT INTO contacts (
                name, email, company, role, service, timeline, budget, message,
                gdpr_consent, marketing_consent, ip_address, user_agent, page, referrer
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            contact_data.get('name'),
            contact_data.get('email'),
            contact_data.get('company'),
            contact_data.get('role'),
            contact_data.get('service'),
            contact_data.get('timeline'),
            contact_data.get('budget'),
            contact_data.get('message'),
            contact_data.get('gdprConsent'),
            contact_data.get('marketingConsent', False),
            contact_data.get('ip_address'),
            contact_data.get('user_agent'),
            contact_data.get('page'),
            contact_data.get('referrer')
        ))
        
        await database.connection.commit()
        logger.info(f"Contact form saved: {contact_data.get('email')}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to save contact: {e}")
        return False

async def get_all_contacts():
    """Get all contact form submissions"""
    try:
        async with database.connection.execute(
            "SELECT * FROM contacts ORDER BY submitted_at DESC"
        ) as cursor:
            rows = await cursor.fetchall()
            columns = [description[0] for description in cursor.description]
            return [dict(zip(columns, row)) for row in rows]
    except Exception as e:
        logger.error(f"Failed to fetch contacts: {e}")
        return []

async def save_expert_consultation(consultation_data: dict):
    """Save expert consultation form submission to database"""
    try:
        await database.connection.execute("""
            INSERT INTO expert_consultations (
                client_type, name, email, company, phone, brief_message, consent,
                details, priority, ip_address, user_agent, page_url, referrer,
                utm_source, utm_medium, utm_campaign
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            consultation_data.get('client_type'),
            consultation_data.get('name'),
            consultation_data.get('email'),
            consultation_data.get('company'),
            consultation_data.get('phone'),
            consultation_data.get('brief_message'),
            consultation_data.get('consent'),
            consultation_data.get('details'),
            consultation_data.get('priority', 5),
            consultation_data.get('ip_address'),
            consultation_data.get('user_agent'),
            consultation_data.get('page_url'),
            consultation_data.get('referrer'),
            consultation_data.get('utm_source'),
            consultation_data.get('utm_medium'),
            consultation_data.get('utm_campaign')
        ))
        
        await database.connection.commit()
        cursor = await database.connection.execute("SELECT last_insert_rowid()")
        consultation_id = (await cursor.fetchone())[0]
        logger.info(f"Expert consultation saved: {consultation_data.get('email')} (ID: {consultation_id})")
        return consultation_id
        
    except Exception as e:
        logger.error(f"Failed to save expert consultation: {e}")
        raise

async def get_all_expert_consultations():
    """Get all expert consultation submissions"""
    try:
        async with database.connection.execute(
            "SELECT * FROM expert_consultations ORDER BY submitted_at DESC"
        ) as cursor:
            rows = await cursor.fetchall()
            columns = [description[0] for description in cursor.description]
            return [dict(zip(columns, row)) for row in rows]
    except Exception as e:
        logger.error(f"Failed to fetch expert consultations: {e}")
        return []

async def get_expert_consultation_by_id(consultation_id: int):
    """Get expert consultation by ID"""
    try:
        async with database.connection.execute(
            "SELECT * FROM expert_consultations WHERE id = ?", (consultation_id,)
        ) as cursor:
            row = await cursor.fetchone()
            if row:
                columns = [description[0] for description in cursor.description]
                return dict(zip(columns, row))
            return None
    except Exception as e:
        logger.error(f"Failed to fetch expert consultation {consultation_id}: {e}")
        return None

async def update_expert_consultation_status(consultation_id: int, status: str):
    """Update expert consultation status"""
    try:
        await database.connection.execute(
            "UPDATE expert_consultations SET status = ? WHERE id = ?", 
            (status, consultation_id)
        )
        await database.connection.commit()
        logger.info(f"Expert consultation {consultation_id} status updated to {status}")
        return True
    except Exception as e:
        logger.error(f"Failed to update expert consultation status: {e}")
        return False

def get_database():
    """Get database instance"""
    return database.connection

def get_db_connection():
    """Get synchronous database connection for admin endpoints"""
    return sqlite3.connect(str(DB_FILE))
