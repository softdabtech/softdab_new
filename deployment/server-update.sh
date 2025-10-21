#!/bin/bash
# SoftDAB Backend - Update .env and restart service
# Run this script on the production server: 185.233.39.171

set -e

echo "=== SoftDAB Backend Update ==="

# Navigate to backend directory
cd /var/www/softdab/backend

# Backup old .env
if [ -f .env ]; then
  cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
  echo "✅ Old .env backed up"
fi

# Update .env with new SMTP password
echo "📝 Updating .env with new SMTP password..."
cat > .env << 'ENVEOF'
# Backend configuration (SQLite + Email)

# Database: SQLite is used (see database.py). Optional DB_DIR can override default path.
# For local development, use a writable relative path
DB_DIR=./data

# Email (SMTP with optional Resend fallback)
SMTP_HOST=smtp.zoho.eu
SMTP_PORT=587
SMTP_USER=noreply@softdab.tech
SMTP_PASS=fytvi9-boszam-Zaqquq
# Use TLS for Zoho SMTP
SMTP_TLS=true

# From identity for emails
FROM_EMAIL=noreply@softdab.tech
FROM_NAME=SoftDAB


# Notification recipients (comma-separated list)
CONTACT_NOTIFICATION_EMAILS=info@softdab.tech
EXPERT_NOTIFICATION_EMAILS=info@softdab.tech

# Misc
TIMEZONE=Europe/Kyiv
#CORS_ORIGINS=https://www.softdab.tech,https://softdab.tech
ENVEOF

echo "✅ .env updated"

# Set proper permissions
chmod 600 .env
echo "✅ Permissions set"

# Restart backend service
echo "🔄 Restarting backend service..."
systemctl restart softdab-backend

echo "⏳ Waiting for service to start..."
sleep 3

# Check service status
echo "📊 Service status:"
systemctl status softdab-backend --no-pager -l | head -20

echo ""
echo "✅ Deployment completed!"
echo "🧪 Test the contact form at: https://www.softdab.tech/contact"
echo ""
echo "📋 To check logs if needed:"
echo "   journalctl -u softdab-backend -n 50 --no-pager"
