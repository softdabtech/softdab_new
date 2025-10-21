import os
import asyncio
import logging
from email.mime.text import MIMEText
import smtplib
import httpx

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
RESEND_API_URL = 'https://api.resend.com/emails'
FROM_EMAIL_DEFAULT = os.environ.get('FROM_EMAIL', 'info@softdab.tech')
FROM_NAME_DEFAULT = os.environ.get('FROM_NAME', 'SoftDAB')


async def _send_via_resend(to_address: str, subject: str, content: str, from_address: str | None) -> bool:
    if not RESEND_API_KEY:
        return False
    if not from_address:
        from_address = f"{FROM_NAME_DEFAULT} <{FROM_EMAIL_DEFAULT}>"
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                RESEND_API_URL,
                headers={
                    'Authorization': f'Bearer {RESEND_API_KEY}',
                    'Content-Type': 'application/json'
                },
                json={
                    'from': from_address,
                    'to': [to_address],
                    'subject': subject,
                    'text': content,
                }
            )
            if response.status_code in (200, 202):
                logger.info(f"Email sent via Resend to {to_address}")
                return True
            logger.error(f"Resend API error: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        logger.error(f"Resend send error: {e}")
        return False


def _smtp_send_blocking(to_address: str, subject: str, content: str, from_address: str | None) -> bool:
    host = os.environ.get('SMTP_HOST', 'localhost')
    port = int(os.environ.get('SMTP_PORT', '25'))
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASS')
    use_tls = os.environ.get('SMTP_TLS', 'false').lower() in ('1', 'true', 'yes')

    from_addr = from_address or f"{FROM_NAME_DEFAULT} <{FROM_EMAIL_DEFAULT}>"
    # Определяем тип письма: plain или html
    if content.strip().lower().startswith('<html'):
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


async def send_email(to_address: str, subject: str, content: str, from_address: str | None = None) -> bool:
    """Send email using Resend when available, otherwise fallback to SMTP.

    Returns True on success, False otherwise.
    """
    # Try Resend first
    sent = await _send_via_resend(to_address, subject, content, from_address)
    if sent:
        return True
    # Fallback to SMTP in a thread to avoid blocking
    return await asyncio.to_thread(_smtp_send_blocking, to_address, subject, content, from_address)
