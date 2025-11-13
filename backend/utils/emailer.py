import os
import asyncio
import logging
import time
from email.mime.text import MIMEText
import smtplib
import httpx

logger = logging.getLogger(__name__)

FROM_EMAIL_DEFAULT = os.environ.get('FROM_EMAIL', 'info@softdab.tech')
FROM_NAME_DEFAULT = os.environ.get('FROM_NAME', 'SoftDAB')
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')


def _smtp_send_blocking(to_address: str, subject: str, content: str, from_address: str | None, is_html: bool = False) -> bool:
    host = os.environ.get('SMTP_HOST', 'localhost')
    port = int(os.environ.get('SMTP_PORT', '25'))
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASS')
    use_tls = os.environ.get('SMTP_TLS', 'false').lower() in ('1', 'true', 'yes')

    from_addr = from_address or f"{FROM_NAME_DEFAULT} <{FROM_EMAIL_DEFAULT}>"
    # Определяем тип письма: plain или html
    if is_html or content.strip().lower().startswith('<html') or content.strip().lower().startswith('<!doctype'):
        msg = MIMEText(content, _subtype='html', _charset='utf-8')
    else:
        msg = MIMEText(content, _subtype='plain', _charset='utf-8')
    # Envelope sender: prefer SMTP_USER (improves deliverability with many providers like Zoho)
    envelope_from = user or FROM_EMAIL_DEFAULT
    if not envelope_from:
        # Extract just the email for SMTP envelope if formatted with name
        envelope_from = FROM_EMAIL_DEFAULT
        if '<' in from_addr and '>' in from_addr:
            try:
                envelope_from = from_addr.split('<', 1)[1].split('>', 1)[0]
            except Exception:
                envelope_from = FROM_EMAIL_DEFAULT
    msg['From'] = from_addr
    msg['To'] = to_address
    msg['Subject'] = subject

    try:
        with smtplib.SMTP(host, port, timeout=10) as server:
            if use_tls:
                server.starttls()
            if user and password:
                server.login(user, password)
            server.sendmail(envelope_from, [to_address], msg.as_string())
        return True
    except Exception as e:
        logger.error(f"SMTP send error: {e}")
        return False


async def send_email(to_address: str, subject: str, content: str, from_address: str | None = None, is_html: bool = False) -> bool:
    """Send email via Resend API (fallback to SMTP if Resend not configured).

    Args:
        to_address: Recipient email address
        subject: Email subject
        content: Email content (plain text or HTML)
        from_address: Sender address (optional)
        is_html: Force HTML content type (optional, auto-detected by default)

    Environment variables expected:
    - RESEND_API_KEY (preferred)
    - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TLS (fallback)
    - FROM_EMAIL, FROM_NAME

    Returns True on success, False otherwise.
    """
    # Try Resend API first if configured
    start = time.time()
    provider = 'smtp'
    success = False
    if RESEND_API_KEY:
        try:
            provider = 'resend'
            success = await _send_via_resend(to_address, subject, content, from_address, is_html)
        except Exception as e:
            logger.error(f"Resend API error: {e}, falling back to SMTP")
            provider = 'smtp'
    if provider == 'smtp' and not success:
        success = await asyncio.to_thread(_smtp_send_blocking, to_address, subject, content, from_address, is_html)
    latency_ms = int((time.time() - start) * 1000)
    logger.info(f"email_delivery provider={provider} to={to_address} subject_len={len(subject)} html={is_html} success={success} latency_ms={latency_ms}")
    return success


async def _send_via_resend(to_address: str, subject: str, content: str, from_address: str | None, is_html: bool) -> bool:
    """Send email via Resend API"""
    from_addr = from_address or f"{FROM_NAME_DEFAULT} <{FROM_EMAIL_DEFAULT}>"
    
    # Auto-detect HTML
    if not is_html:
        is_html = content.strip().lower().startswith('<html') or content.strip().lower().startswith('<!doctype')
    
    payload = {
        "from": from_addr,
        "to": [to_address],
        "subject": subject,
    }
    
    if is_html:
        payload["html"] = content
    else:
        payload["text"] = content
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.resend.com/emails",
            json=payload,
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json"
            },
            timeout=30.0
        )
        
        if response.status_code == 200:
            logger.info(f"Email sent via Resend to {to_address}")
            return True
        else:
            logger.error(f"Resend API error: {response.status_code} - {response.text}")
            return False
