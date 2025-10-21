#!/bin/bash
# ============================================================================
# SoftDAB Backend Complete Deployment Script
# Автоматическое обновление .env, перезапуск сервиса и тестирование
# ============================================================================

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  SoftDAB Backend - Полное Обновление и Деплой                 ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Navigate to backend directory
echo "📂 Переход в директорию backend..."
cd /var/www/softdab/backend

# Backup old .env
echo "💾 Создание резервной копии .env..."
if [ -f .env ]; then
    BACKUP_FILE=".env.backup.$(date +%Y%m%d_%H%M%S)"
    cp .env "$BACKUP_FILE"
    echo "   ✅ Резервная копия создана: $BACKUP_FILE"
else
    echo "   ⚠️  Файл .env не найден, создаётся новый"
fi

# Update .env with new SMTP password
echo "📝 Обновление .env с новыми настройками SMTP..."
cat > .env << 'ENVEOF'
# Backend configuration (SQLite + Email)
DB_DIR=./data

# Email (SMTP - Zoho)
SMTP_HOST=smtp.zoho.eu
SMTP_PORT=587
SMTP_USER=noreply@softdab.tech
SMTP_PASS=fytvi9-boszam-Zaqquq
SMTP_TLS=true

# From identity for emails
FROM_EMAIL=noreply@softdab.tech
FROM_NAME=SoftDAB

# Notification recipients (comma-separated list)
CONTACT_NOTIFICATION_EMAILS=info@softdab.tech
EXPERT_NOTIFICATION_EMAILS=info@softdab.tech

# Misc
TIMEZONE=Europe/Kyiv
ENVEOF

chmod 600 .env
echo "   ✅ .env обновлён и права установлены (600)"

# Restart backend service
echo "🔄 Перезапуск backend-сервиса..."
systemctl restart softdab-backend
echo "   ✅ Сервис перезапущен"

# Wait for service to start
echo "⏳ Ожидание запуска сервиса (5 секунд)..."
sleep 5

# Check service status
echo "📊 Статус сервиса:"
if systemctl is-active --quiet softdab-backend; then
    echo "   ✅ Сервис активен и работает"
    systemctl status softdab-backend --no-pager | head -10
else
    echo "   ❌ ОШИБКА: Сервис не запущен!"
    echo "   Логи последних ошибок:"
    journalctl -u softdab-backend -n 20 --no-pager
    exit 1
fi

# Test SMTP connection
echo ""
echo "🧪 Тестирование SMTP-подключения..."
cat > /tmp/smtp_test.py << 'PYEOF'
import smtplib
from email.mime.text import MIMEText
import sys

try:
    msg = MIMEText('Тест SMTP после деплоя. Если вы видите это письмо — всё работает! ✅')
    msg['Subject'] = 'SoftDAB SMTP Test - Deployment Success'
    msg['From'] = 'noreply@softdab.tech'
    msg['To'] = 'info@softdab.tech'
    
    with smtplib.SMTP('smtp.zoho.eu', 587, timeout=10) as server:
        server.starttls()
        server.login('noreply@softdab.tech', 'fytvi9-boszam-Zaqquq')
        server.sendmail('noreply@softdab.tech', ['info@softdab.tech'], msg.as_string())
    
    print('   ✅ SMTP работает! Тестовое письмо отправлено на info@softdab.tech')
    sys.exit(0)
except Exception as e:
    print(f'   ❌ ОШИБКА SMTP: {e}')
    sys.exit(1)
PYEOF

python3 /tmp/smtp_test.py
SMTP_STATUS=$?
rm -f /tmp/smtp_test.py

# Final summary
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  РЕЗУЛЬТАТЫ ДЕПЛОЯ                                             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "✅ .env обновлён с новым SMTP-паролем"
echo "✅ Backend-сервис перезапущен и работает"

if [ $SMTP_STATUS -eq 0 ]; then
    echo "✅ SMTP-соединение проверено и работает"
    echo ""
    echo "🎉 ВСЁ ГОТОВО! Форма контактов должна работать."
    echo ""
    echo "🧪 Протестируйте форму на:"
    echo "   👉 https://www.softdab.tech/contact"
    echo ""
    echo "� Проверьте почту info@softdab.tech (включая спам)"
else
    echo "⚠️  SMTP-соединение не работает - проверьте пароль и настройки Zoho"
fi

echo ""
echo "📋 Полезные команды:"
echo "   • Логи backend:        journalctl -u softdab-backend -f"
echo "   • Статус сервиса:      systemctl status softdab-backend"
echo "   • Перезапуск сервиса:  systemctl restart softdab-backend"
echo ""
