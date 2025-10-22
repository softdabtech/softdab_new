import os
import asyncio
import logging
from email.mime.text import MIMEText
import smtplib

logger = logging.getLogger(__name__)

FROM_EMAIL_DEFAULT = os.environ.get('FROM_EMAIL', 'info@softdab.tech')
FROM_NAME_DEFAULT = os.environ.get('FROM_NAME', 'SoftDAB')


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
    """Send email via Zoho SMTP (TLS). Async wrapper over blocking smtplib.

    Args:
        to_address: Recipient email address
        subject: Email subject
        content: Email content (plain text or HTML)
        from_address: Sender address (optional)
        is_html: Force HTML content type (optional, auto-detected by default)

    Environment variables expected:
    - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TLS
    - FROM_EMAIL, FROM_NAME

    Returns True on success, False otherwise.
    """
    return await asyncio.to_thread(_smtp_send_blocking, to_address, subject, content, from_address, is_html)
