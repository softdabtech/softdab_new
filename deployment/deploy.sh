#!/bin/bash

# SoftDAB Deployment Script
# Использование: ./deploy.sh

set -e

echo "🚀 Starting SoftDAB deployment..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Переменные
SERVER_IP="159.65.252.227"
SERVER_USER="root"
DOMAIN="softdab.tech"
APP_DIR="/var/www/softdab"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"

echo -e "${YELLOW}📦 Building frontend...${NC}"
cd frontend
npm install
npm run build
# Generate prerendered static snapshots so pages include canonical/hreflang/JSON-LD server-side
npm run prerender
cd ..

echo -e "${YELLOW}📤 Uploading files to server...${NC}"

# Создаем директории на сервере
ssh $SERVER_USER@$SERVER_IP "mkdir -p $APP_DIR/{backend,frontend,logs}"

# Загружаем бэкенд
echo -e "${YELLOW}Uploading backend...${NC}"
rsync -avz --exclude='.venv' --exclude='__pycache__' --exclude='*.pyc' \
    backend/ $SERVER_USER@$SERVER_IP:$BACKEND_DIR/

# Загружаем фронтенд
echo -e "${YELLOW}Uploading frontend build...${NC}"
rsync -avz frontend/dist/ $SERVER_USER@$SERVER_IP:$FRONTEND_DIR/dist/

# Загружаем конфигурационные файлы
echo -e "${YELLOW}Uploading configuration files...${NC}"
scp deployment/nginx.conf $SERVER_USER@$SERVER_IP:/tmp/softdab-nginx.conf
scp deployment/softdab-backend.service $SERVER_USER@$SERVER_IP:/tmp/softdab-backend.service

echo -e "${YELLOW}🔧 Configuring server...${NC}"

# Выполняем команды на сервере
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'

# Обновляем систему
apt-get update

# Устанавливаем необходимые пакеты
apt-get install -y python3.11 python3.11-venv python3-pip nginx

# Создаем виртуальное окружение для бэкенда
cd /var/www/softdab/backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Настраиваем nginx
mv /tmp/softdab-nginx.conf /etc/nginx/sites-available/softdab
ln -sf /etc/nginx/sites-available/softdab /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

# Настраиваем systemd сервис для бэкенда
mv /tmp/softdab-backend.service /etc/systemd/system/
mkdir -p /var/log/softdab
systemctl daemon-reload
systemctl enable softdab-backend
systemctl restart softdab-backend

# Проверяем статусы
systemctl status nginx --no-pager
systemctl status softdab-backend --no-pager

ENDSSH

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e "${GREEN}Your site should be available at: http://$DOMAIN${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Set up .env file on server with your credentials"
echo -e "2. Configure SSL with: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo -e "3. Check logs: sudo journalctl -u softdab-backend -f"
