import pytest
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
from middlewares.data_retention import DataRetentionPolicy, GDPRCompliance

class MockCollection:
    async def delete_many(self, query):
        return None
    async def find_one(self, query):
        return {
            '_id': 'test_id',
            'name': 'John Doe',
            'email': 'john@example.com',
            'phone': '123-456-7890',
            'timestamp': datetime.utcnow()
        }
    async def update_one(self, query, update):
        return None
    async def insert_one(self, doc):
        return None

@pytest.fixture
def mock_db():
    class MockDB:
        def __init__(self):
            self.collection = MockCollection()
            self.access_logs = MockCollection()
        def __getitem__(self, key):
            return self.collection
        async def get_collection(self, name):
            return self.collection
    
    return MockDB()

@pytest.mark.asyncio
async def test_data_retention_policy(mock_db):
    policy = DataRetentionPolicy(mock_db)
    
    # Test cleanup of expired data
    await policy.cleanup_expired_data()
    
    # Test data anonymization
    await policy.anonymize_data('contacts', 'test_id')

@pytest.mark.asyncio
async def test_gdpr_compliance():
    gdpr = GDPRCompliance()
    
    # Test consent validation
    data_with_consent = {'gdpr_consent': True}
    assert gdpr.validate_consent(data_with_consent) is True
    
    data_without_consent = {'gdpr_consent': False}
    assert gdpr.validate_consent(data_without_consent) is False
    
    # Test data purpose validation
    data_with_purpose = {'data_purpose': 'marketing'}
    assert gdpr.validate_data_purpose(data_with_purpose) is True
    
    data_without_purpose = {}
    assert gdpr.validate_data_purpose(data_without_purpose) is False
    
    # Test data export preparation
    test_data = {
        'name': 'John Doe',
        'email': 'john@example.com',
        'company': 'Test Co',
        'communication_history': ['email_1', 'email_2'],
        'consent_history': ['consent_1'],
        'data_purpose': 'marketing',
        'timestamp': datetime.utcnow()
    }
    
    export_data = gdpr.prepare_for_export(test_data)
    assert export_data['personal_data']['name'] == 'John Doe'
    assert export_data['personal_data']['email'] == 'john@example.com'
    assert export_data['data_purpose'] == 'marketing'
    assert len(export_data['communication_history']) == 2
    assert len(export_data['consent_history']) == 1