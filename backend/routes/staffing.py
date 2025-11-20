from fastapi import APIRouter, HTTPException, Request
from models.staffing import StaffingRequest
from database import save_staffing_request
from datetime import datetime
import logging
import os
from utils.emailer import send_email

logger = logging.getLogger(__name__)
router = APIRouter()

FROM_EMAIL = os.environ.get('FROM_EMAIL', 'noreply@softdab.tech')
FROM_NAME = os.environ.get('FROM_NAME', 'SoftDAB')
ADMIN_EMAILS = [e.strip() for e in os.environ.get('CONTACT_NOTIFICATION_EMAILS', 'info@softdab.tech').split(',') if e.strip()]


@router.post("")
async def create_staffing_request(form: StaffingRequest, request: Request):
    # Honeypot
    if form.website:
        logger.warning(f"Honeypot (staffing) triggered from {request.client.host}")
        return {"status": "success"}

    if not form.gdprConsent:
        raise HTTPException(status_code=400, detail="GDPR consent is required")

    data = form.dict()
    data['ip_address'] = request.client.host
    data['user_agent'] = request.headers.get('user-agent')

    saved = await save_staffing_request(data)
    if not saved:
        logger.warning(f"Failed to save staffing request to DB: {form.email}")

    # Build admin notification email
    roles_str = ", ".join(form.roles)
    notification = f"""New Staffing Request\n\n"""
    notification += f"Name: {form.name}\nEmail: {form.email}\nCompany: {form.company or '-'}\n\n"
    notification += f"Roles: {roles_str or '-'}\nEngagement: {form.engagement}\nSeniority: {form.seniority}\n"
    notification += f"Duration: {form.duration or '-'}\nStart Date: {form.startDate or '-'}\nRate: {form.rate or '-'}\n\n"
    notification += f"Message:\n{form.message or '-'}\n\n"
    notification += f"IP: {request.client.host}\nUA: {request.headers.get('user-agent', 'N/A')}\n"
    notification += f"Timestamp: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}\n"

    sent_count = 0
    for admin in ADMIN_EMAILS:
        try:
            ok = await send_email(
                to_address=admin,
                subject=f"Staffing Request: {form.name} ({form.company or 'N/A'})",
                content=notification,
                from_address=f"{FROM_NAME} <{FROM_EMAIL}>"
            )
            if ok:
                sent_count += 1
        except Exception as e:
            logger.error(f"Failed to notify admin {admin}: {e}")

    # Confirmation to user
    try:
        confirm_text = f"""Dear {form.name},\n\nThank you for your staffing request!\nOur team will contact you within 24 hours.\n\nBest regards,\nSoftDAB Team\nhttps://softdab.tech\n"""
        ok = await send_email(
            to_address=form.email,
            subject="We received your staffing request — SoftDAB",
            content=confirm_text,
            from_address=f"{FROM_NAME} <{FROM_EMAIL}>"
        )
        if ok:
            sent_count += 1
    except Exception as e:
        logger.error(f"Failed to send staffing confirmation to user: {e}")

    # Response mirrors contact handler
    if saved:
        if sent_count >= 2:
            return {"status": "success", "message": "Your request has been received. We'll get back to you soon!"}
        elif sent_count > 0:
            return {"status": "success", "message": "Request received. Some emails may be delayed."}
        else:
            return {"status": "success", "message": "Request saved. We'll contact you shortly."}
    else:
        raise HTTPException(status_code=500, detail="Failed to process your request. Please try again later.")
