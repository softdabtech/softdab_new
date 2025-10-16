# SoftDAB Deployment Guide

Руководство по развертыванию сайта SoftDAB на DigitalOcean

## Предварительные требования

- DigitalOcean Droplet (Ubuntu 22.04)
- Домен настроен и указывает на IP сервера: 159.65.252.227
- SSH доступ к серверу
- Node.js установлен локально для сборки фронтенда

## Структура проекта

```
/var/www/softdab/
├── backend/          # FastAPI бэкенд
│   ├── .venv/       # Python виртуальное окружение
│   ├── server.py
│   ├── requirements.txt
│   └── .env         # Переменные окружения (создать вручную)
├── frontend/         # React фронтенд
│   └── dist/        # Production сборка
└── logs/            # Логи приложения
```

## Шаг 1: Подготовка на локальной машине

### 1.1. Сделайте скрипт deploy.sh исполняемым:

```bash
chmod +x deployment/deploy.sh
```

### 1.2. Убедитесь, что у вас есть SSH доступ:

```bash
ssh root@159.65.252.227
```

## Шаг 2: Первоначальная настройка сервера

### 2.1. Подключитесь к серверу:

```bash
ssh root@159.65.252.227
```

### 2.2. Обновите систему:

```bash
apt-get update && apt-get upgrade -y
```

### 2.3. Установите необходимые пакеты:

```bash
apt-get install -y python3.11 python3.11-venv python3-pip nginx certbot python3-certbot-nginx ufw
```

### 2.4. Настройте firewall:

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## Шаг 3: Автоматический деплой

С вашей локальной машины запустите:

```bash
./deployment/deploy.sh
```

Скрипт выполнит:
- Сборку фронтенда
- Загрузку файлов на сервер
- Установку зависимостей
- Настройку nginx
- Настройку systemd сервиса для бэкенда

## Шаг 4: Настройка переменных окружения

### 4.1. Подключитесь к серверу:

```bash
ssh root@159.65.252.227
```

### 4.2. Создайте .env файл:

```bash
nano /var/www/softdab/backend/.env
```

### 4.3. Заполните переменные (используйте deployment/.env.production как шаблон):

```env
ZOHO_SMTP_USER=noreply@softdab.tech
ZOHO_SMTP_PASS=your_actual_password
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=https://softdab.tech,https://www.softdab.tech
SECRET_KEY=generate_random_secret_key_here
```

### 4.4. Перезапустите бэкенд:

```bash
systemctl restart softdab-backend
```

## Шаг 5: Настройка SSL сертификата

### 5.1. Установите SSL сертификат:

```bash
certbot --nginx -d softdab.tech -d www.softdab.tech
```

### 5.2. Следуйте инструкциям certbot:
- Введите email для уведомлений
- Согласитесь с условиями
- Выберите опцию перенаправления HTTP на HTTPS (рекомендуется)

### 5.3. Проверьте автоматическое обновление:

```bash
certbot renew --dry-run
```

## Шаг 6: Проверка и мониторинг

### 6.1. Проверьте статус сервисов:

```bash
systemctl status nginx
systemctl status softdab-backend
```

### 6.2. Просмотр логов:

```bash
# Логи бэкенда
journalctl -u softdab-backend -f

# Логи nginx
tail -f /var/log/nginx/softdab-error.log
tail -f /var/log/nginx/softdab-access.log

# Логи приложения
tail -f /var/log/softdab/backend.log
tail -f /var/log/softdab/backend-error.log
```

### 6.3. Проверьте работу сайта:

```bash
curl https://softdab.tech
curl https://softdab.tech/api/health
```

## Обновление приложения

Для обновления просто запустите снова:

```bash
./deployment/deploy.sh
```

## Ручные команды

### Перезапуск бэкенда:
```bash
ssh root@159.65.252.227 "systemctl restart softdab-backend"
```

### Перезапуск nginx:
```bash
ssh root@159.65.252.227 "systemctl restart nginx"
```

### Просмотр логов:
```bash
ssh root@159.65.252.227 "journalctl -u softdab-backend -n 100 --no-pager"
```

## Устранение неполадок

### Проблема: Бэкенд не запускается

```bash
# Проверьте логи
journalctl -u softdab-backend -n 50

# Проверьте .env файл
cat /var/www/softdab/backend/.env

# Проверьте права
ls -la /var/www/softdab/backend/

# Проверьте виртуальное окружение
/var/www/softdab/backend/.venv/bin/python --version
```

### Проблема: 502 Bad Gateway

```bash
# Проверьте, работает ли бэкенд
curl http://127.0.0.1:8000/api/health

# Проверьте порт
netstat -tulpn | grep 8000

# Проверьте nginx конфигурацию
nginx -t
```

### Проблема: CORS ошибки

Убедитесь, что в `.env` файле на сервере указаны правильные домены:
```
CORS_ORIGINS=https://softdab.tech,https://www.softdab.tech
```

## Полезные команды

```bash
# Перезагрузка всех сервисов
systemctl restart softdab-backend nginx

# Просмотр использования ресурсов
htop

# Просмотр дискового пространства
df -h

# Очистка логов
journalctl --vacuum-time=7d
```

## Бэкапы

### Создание бэкапа:
```bash
# Бэкап кода
tar -czf /root/backups/softdab-$(date +%Y%m%d).tar.gz /var/www/softdab/

# Бэкап nginx конфигурации
cp /etc/nginx/sites-available/softdab /root/backups/nginx-softdab-$(date +%Y%m%d).conf
```

## Контакты

При возникновении проблем:
- Email: info@softdab.tech
- GitHub: https://github.com/softdabtech/softdab_new
