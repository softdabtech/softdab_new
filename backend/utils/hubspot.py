"""HubSpot integration for form submissions via Forms API"""
import os
import logging
import httpx
from typing import Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)

# HubSpot configuration
HUBSPOT_PORTAL_ID = os.environ.get('HUBSPOT_PORTAL_ID', '48799606')
HUBSPOT_CONTACT_FORM_GUID = os.environ.get('HUBSPOT_CONTACT_FORM_GUID')
HUBSPOT_EXPERT_FORM_GUID = os.environ.get('HUBSPOT_EXPERT_FORM_GUID')
HUBSPOT_ENABLED = os.environ.get('HUBSPOT_ENABLED', 'false').lower() in ('1', 'true', 'yes')


async def send_to_hubspot_contact(contact_data: Dict[str, Any]) -> bool:
    """
    Send contact form data to HubSpot via Forms API (v3)
    Uses HubSpot Forms submission endpoint - no API key required
    
    Args:
        contact_data: Contact form data with fields like name, email, company, etc.
        
    Returns:
        True if successful, False otherwise
    """
    if not HUBSPOT_ENABLED or not HUBSPOT_CONTACT_FORM_GUID:
        logger.info("HubSpot integration disabled or Contact Form GUID not configured")
        return False
    
    try:
        # Extract first and last name from full name
        name_parts = contact_data.get('name', '').strip().split(maxsplit=1)
        firstname = name_parts[0] if len(name_parts) > 0 else ''
        lastname = name_parts[1] if len(name_parts) > 1 else ''
        
        # Prepare form fields for HubSpot Forms API
        fields = [
            {"name": "email", "value": contact_data.get('email', '')},
            {"name": "firstname", "value": firstname},
            {"name": "lastname", "value": lastname},
            {"name": "company", "value": contact_data.get('company', '')},
            {"name": "jobtitle", "value": contact_data.get('role', '')},
            {"name": "phone", "value": contact_data.get('phone', '')},
            {"name": "message", "value": contact_data.get('message', '')},
        ]
        
        # Add custom context
        context = {
            "hutk": None,  # HubSpot tracking cookie (if available)
            "pageUri": contact_data.get('page_url', 'https://www.softdab.tech/contact'),
            "pageName": "Contact Form"
        }
        
        # Add legal consent (GDPR)
        legal_consent = {
            "consent": {
                "consentToProcess": True if contact_data.get('gdprConsent') else False,
                "text": "I agree to allow SoftDAB to store and process my personal data.",
                "communications": [
                    {
                        "value": True if contact_data.get('marketingConsent') else False,
                        "subscriptionTypeId": 999,  # Replace with your subscription type ID
                        "text": "I agree to receive marketing communications from SoftDAB."
                    }
                ]
            }
        }
        
        # HubSpot Forms API v3 submission
        payload = {
            "fields": fields,
            "context": context,
            "legalConsentOptions": legal_consent
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"https://api.hsforms.com/submissions/v3/integration/submit/{HUBSPOT_PORTAL_ID}/{HUBSPOT_CONTACT_FORM_GUID}",
                json=payload,
                headers={
                    "Content-Type": "application/json"
                },
                timeout=30.0
            )
            
            if response.status_code == 200:
                logger.info(f"Contact form submitted to HubSpot: {contact_data.get('email')}")
                return True
            else:
                logger.error(f"HubSpot Forms API error: {response.status_code} - {response.text}")
                return False
                
    except Exception as e:
        logger.error(f"Failed to send contact to HubSpot: {e}")
        return False


async def send_to_hubspot_consultation(consultation_data: Dict[str, Any]) -> bool:
    """
    Send expert consultation data to HubSpot via Forms API
    
    Args:
        consultation_data: Consultation data with client_type, details, etc.
        
    Returns:
        True if successful, False otherwise
    """
    if not HUBSPOT_ENABLED or not HUBSPOT_EXPERT_FORM_GUID:
        logger.info("HubSpot integration disabled or Expert Form GUID not configured")
        return False
    
    try:
        # Extract first and last name
        name_parts = consultation_data.get('name', '').strip().split(maxsplit=1)
        firstname = name_parts[0] if len(name_parts) > 0 else ''
        lastname = name_parts[1] if len(name_parts) > 1 else ''
        
        # Parse details if it's a JSON string
        details = consultation_data.get('details', {})
        if isinstance(details, str):
            import json
            try:
                details = json.loads(details)
            except:
                details = {}
        
        # Prepare message with all details
        detailed_message = f"""Expert Consultation Request

Client Type: {consultation_data.get('client_type', '').title()}
Priority: {consultation_data.get('priority', 'N/A')}/10

Brief Message:
{consultation_data.get('brief_message', '')}

Additional Details:
{_format_details(details)}

Tracking Information:
- Page URL: {consultation_data.get('page_url', 'N/A')}
- UTM Source: {consultation_data.get('utm_source', 'N/A')}
- UTM Medium: {consultation_data.get('utm_medium', 'N/A')}
- UTM Campaign: {consultation_data.get('utm_campaign', 'N/A')}
- Referrer: {consultation_data.get('referrer', 'N/A')}
- IP: {consultation_data.get('ip_address', 'N/A')}
"""
        
        # Prepare form fields
        fields = [
            {"name": "email", "value": consultation_data.get('email', '')},
            {"name": "firstname", "value": firstname},
            {"name": "lastname", "value": lastname},
            {"name": "company", "value": consultation_data.get('company', '')},
            {"name": "phone", "value": consultation_data.get('phone', '')},
            {"name": "message", "value": detailed_message},
        ]
        
        # Context
        context = {
            "hutk": None,
            "pageUri": consultation_data.get('page_url', 'https://www.softdab.tech/expert-consultation'),
            "pageName": f"Expert Consultation - {consultation_data.get('client_type', '').title()}"
        }
        
        # Legal consent
        legal_consent = {
            "consent": {
                "consentToProcess": True if consultation_data.get('consent') else False,
                "text": "I agree to allow SoftDAB to store and process my personal data.",
                "communications": []
            }
        }
        
        # Submit to HubSpot
        payload = {
            "fields": fields,
            "context": context,
            "legalConsentOptions": legal_consent
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"https://api.hsforms.com/submissions/v3/integration/submit/{HUBSPOT_PORTAL_ID}/{HUBSPOT_EXPERT_FORM_GUID}",
                json=payload,
                headers={
                    "Content-Type": "application/json"
                },
                timeout=30.0
            )
            
            if response.status_code == 200:
                logger.info(f"Expert consultation submitted to HubSpot: {consultation_data.get('email')}")
                return True
            else:
                logger.error(f"HubSpot Forms API error: {response.status_code} - {response.text}")
                return False
                
    except Exception as e:
        logger.error(f"Failed to send consultation to HubSpot: {e}")
        return False


def _format_details(details: Dict[str, Any]) -> str:
    """Format details dictionary as readable text"""
    if not details:
        return "No additional details"
    
    formatted = []
    for key, value in details.items():
        if value:
            formatted_key = key.replace('_', ' ').title()
            formatted.append(f"- {formatted_key}: {value}")
    
    return '\n'.join(formatted) if formatted else "No additional details"
