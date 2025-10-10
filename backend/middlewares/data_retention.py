"""
Политики хранения данных и GDPR compliance
"""
from datetime import datetime, timedelta
from typing import Dict, Any
from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi import HTTPException


class DataRetentionPolicy:
    """Политика хранения данных"""
    RETENTION_PERIODS = {
        'contacts': timedelta(days=365),  # 1 год для контактных данных
        'logs': timedelta(days=30),       # 30 дней для логов
        'analytics': timedelta(days=90),  # 90 дней для аналитики
    }

    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db

    async def cleanup_expired_data(self):
        """Удаление устаревших данных"""
        for collection, retention in self.RETENTION_PERIODS.items():
            expiry_date = datetime.utcnow() - retention
            await self.db[collection].delete_many({
                'timestamp': {'$lt': expiry_date}
            })

    async def anonymize_data(self, collection: str, document_id: str):
        """Анонимизация данных по запросу"""
        doc = await self.db[collection].find_one({'_id': document_id})
        if not doc:
            raise HTTPException(status_code=404, detail="Document not found")

        anonymized = self._anonymize_fields(doc)
        await self.db[collection].update_one(
            {'_id': document_id},
            {'$set': anonymized}
        )

    def _anonymize_fields(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Анонимизация полей с персональными данными"""
        sensitive_fields = {
            'email': 'anonymized@example.com',
            'name': 'Anonymous User',
            'phone': 'XXX-XXX-XXXX',
            'address': 'anonymized',
            'ip_address': '0.0.0.0'
        }

        anonymized = data.copy()
        for field, value in data.items():
            if field in sensitive_fields:
                anonymized[field] = sensitive_fields[field]
        return anonymized


class GDPRCompliance:
    """GDPR compliance утилиты"""
    
    @staticmethod
    def validate_consent(data: Dict[str, Any]) -> bool:
        """Проверка наличия согласия на обработку данных"""
        return data.get('gdpr_consent') is True

    @staticmethod
    def validate_data_purpose(data: Dict[str, Any]) -> bool:
        """Проверка наличия цели обработки данных"""
        return bool(data.get('data_purpose'))

    @staticmethod
    def prepare_for_export(data: Dict[str, Any]) -> Dict[str, Any]:
        """Подготовка данных для экспорта по запросу пользователя"""
        export_data = {
            'personal_data': {
                'name': data.get('name'),
                'email': data.get('email'),
                'company': data.get('company')
            },
            'communication_history': data.get('communication_history', []),
            'consent_history': data.get('consent_history', []),
            'data_purpose': data.get('data_purpose'),
            'collection_date': data.get('timestamp')
        }
        return export_data

    @staticmethod
    def log_data_access(db: AsyncIOMotorDatabase, user_id: str, action: str):
        """Логирование доступа к данным"""
        log = {
            'user_id': user_id,
            'action': action,
            'timestamp': datetime.utcnow()
        }
        return db.access_logs.insert_one(log)