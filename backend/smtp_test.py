import smtplib
from email.mime.text import MIMEText
import os

SMTP_HOST = os.environ.get('SMTP_HOST', 'smtp.zoho.eu')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USER = os.environ.get('SMTP_USER', 'noreply@softdab.tech')
SMTP_PASS = os.environ.get('SMTP_PASS', 'k4biwe%N')
FROM_EMAIL = os.environ.get('FROM_EMAIL', 'noreply@softdab.tech')
TO_EMAIL = os.environ.get('CONTACT_NOTIFICATION_EMAILS', 'info@softdab.tech')

msg = MIMEText('Тестовое письмо от SoftDAB SMTP (Zoho). Если вы это видите — SMTP работает!')
msg['Subject'] = 'SMTP TEST — SoftDAB'
msg['From'] = FROM_EMAIL
msg['To'] = TO_EMAIL

try:
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(FROM_EMAIL, [TO_EMAIL], msg.as_string())
    print('Письмо успешно отправлено!')
except Exception as e:
    print(f'Ошибка SMTP: {e}')
