# 🚀 Пошаговая инструкция по развертыванию SoftDAB

## 📋 Что у нас есть:
- **Сервер**: 159.65.252.227 (Ubuntu 22.04)
- **Домен**: softdab.tech
- **Git**: установлен на сервере

---

## ЧАСТЬ 1: Настройка сервера (в терминале дроплета)

### Шаг 1: Подключитесь к серверу

На вашем компьютере (Mac):
```bash
ssh root@159.65.252.227
```

### Шаг 2: Проверьте Git (на сервере)

```bash
git --version
```
Должно показать версию Git. Если нет, установите:
```bash
apt-get install -y git
```

### Шаг 3: Обновите систему (на сервере)

```bash
apt-get update && apt-get upgrade -y
```

### Шаг 4: Установите необходимое ПО (на сервере)

```bash
# Python 3.11 и инструменты
apt-get install -y python3.11 python3.11-venv python3-pip

# Nginx
apt-get install -y nginx

# Certbot для SSL
apt-get install -y certbot python3-certbot-nginx

# Node.js (для сборки фронтенда, если понадобится)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Дополнительные утилиты
apt-get install -y ufw curl wget
```

### Шаг 5: Настройте Firewall (на сервере)

```bash
# Разрешаем SSH
ufw allow OpenSSH

# Разрешаем HTTP и HTTPS
ufw allow 'Nginx Full'

# Включаем firewall
ufw --force enable

# Проверяем статус
ufw status
```

### Шаг 6: Создайте структуру директорий (на сервере)

```bash
# Создаем директории
mkdir -p /var/www/softdab/{backend,frontend/dist,logs}

# Создаем директорию для логов
mkdir -p /var/log/softdab

# Устанавливаем права
chown -R www-data:www-data /var/www/softdab
chown -R www-data:www-data /var/log/softdab
```

### Шаг 7: Клонируйте репозиторий (на сервере)

```bash
# Переходим в директорию
cd /var/www/softdab

# Клонируем репозиторий (вариант 1 - HTTPS)
git clone https://github.com/softdabtech/softdab_new.git temp_repo

# Или, если есть SSH ключ (вариант 2 - SSH)
# git clone git@github.com:softdabtech/softdab_new.git temp_repo

# Перемещаем файлы бэкенда
cp -r temp_repo/backend/* /var/www/softdab/backend/

# Перемещаем deployment конфигурации
cp -r temp_repo/deployment /var/www/softdab/

# Удаляем временную директорию
rm -rf temp_repo
```

### Шаг 8: Настройте Python окружение (на сервере)

```bash
# Переходим в директорию бэкенда
cd /var/www/softdab/backend

# Создаем виртуальное окружение
python3.11 -m venv .venv

# Активируем его
source .venv/bin/activate

# Обновляем pip
pip install --upgrade pip

# Устанавливаем зависимости
pip install -r requirements.txt

# Деактивируем (необязательно)
deactivate
```

### Шаг 9: Создайте .env файл (на сервере)

```bash
nano /var/www/softdab/backend/.env
```

Вставьте следующее содержимое (замените значения на ваши реальные):

```env
# SMTP Settings (Zoho)
ZOHO_SMTP_USER=noreply@softdab.tech
ZOHO_SMTP_PASS=ваш_реальный_пароль_zoho

# API Settings
PORT=8000
HOST=0.0.0.0

# CORS Settings
CORS_ORIGINS=https://softdab.tech,https://www.softdab.tech,http://softdab.tech,http://www.softdab.tech

# Security (сгенерируйте случайный ключ)
SECRET_KEY=замените_на_случайную_строку_минимум_32_символа
```

Сохраните файл: `Ctrl+X`, затем `Y`, затем `Enter`

### Шаг 10: Настройте Systemd сервис для бэкенда (на сервере)

```bash
# Копируем конфигурацию сервиса
cp /var/www/softdab/deployment/softdab-backend.service /etc/systemd/system/

# Перезагружаем systemd
systemctl daemon-reload

# Включаем автозапуск
systemctl enable softdab-backend

# Запускаем сервис
systemctl start softdab-backend

# Проверяем статус
systemctl status softdab-backend
```

Если увидите ошибки, проверьте логи:
```bash
journalctl -u softdab-backend -n 50
```

### Шаг 11: Настройте Nginx (на сервере)

```bash
# Копируем конфигурацию Nginx
cp /var/www/softdab/deployment/nginx.conf /etc/nginx/sites-available/softdab

# Создаем символическую ссылку
ln -sf /etc/nginx/sites-available/softdab /etc/nginx/sites-enabled/

# Удаляем дефолтную конфигурацию
rm -f /etc/nginx/sites-enabled/default

# Проверяем конфигурацию
nginx -t

# Если всё ок, перезапускаем Nginx
systemctl restart nginx

# Проверяем статус
systemctl status nginx
```

### Шаг 12: Проверьте работу бэкенда (на сервере)

```bash
# Проверяем, что бэкенд отвечает локально
curl http://127.0.0.1:8000/api/contact

# Должно вернуть ошибку 405 или 422 (это нормально, значит работает)
```

---

## ЧАСТЬ 2: Подготовка и загрузка фронтенда (на вашем Mac)

### Шаг 13: Обновите API URL в фронтенде (на Mac)

Откройте терминал на вашем Mac и перейдите в директорию проекта:

```bash
cd "/Users/oleksii/Documents/SOFTDAB/Website new/Git/softdab_new"
```

Проверьте файл конфигурации API:
```bash
cat frontend/src/lib/api.js | head -5
```

### Шаг 14: Создайте production .env для фронтенда (на Mac)

```bash
# Создайте файл .env.production в директории frontend
cat > frontend/.env.production << 'EOF'
VITE_API_URL=https://softdab.tech/api
EOF
```

### Шаг 15: Соберите фронтенд (на Mac)

```bash
# Перейдите в директорию фронтенда
cd frontend

# Установите зависимости (если еще не установлены)
npm install

# Соберите production версию
npm run build

# Вернитесь в корень проекта
cd ..
```

### Шаг 16: Загрузите фронтенд на сервер (на Mac)

```bash
# Используем rsync для загрузки (из корня проекта)
rsync -avz --progress frontend/dist/ root@159.65.252.227:/var/www/softdab/frontend/dist/
```

---

## ЧАСТЬ 3: Настройка SSL (на сервере)

### Шаг 17: Подключитесь к серверу снова (на Mac)

```bash
ssh root@159.65.252.227
```

### Шаг 18: Установите SSL сертификат (на сервере)

```bash
# Запустите certbot
certbot --nginx -d softdab.tech -d www.softdab.tech

# Следуйте инструкциям:
# 1. Введите ваш email
# 2. Согласитесь с условиями (Y)
# 3. Выберите опцию 2 (Redirect HTTP to HTTPS)
```

### Шаг 19: Проверьте автоматическое обновление SSL (на сервере)

```bash
certbot renew --dry-run
```

---

## ЧАСТЬ 4: Финальная проверка

### Шаг 20: Проверьте все сервисы (на сервере)

```bash
# Проверяем Nginx
systemctl status nginx

# Проверяем бэкенд
systemctl status softdab-backend

# Проверяем логи бэкенда
tail -n 50 /var/log/softdab/backend.log

# Проверяем ошибки
tail -n 50 /var/log/softdab/backend-error.log
```

### Шаг 21: Тестируйте сайт

На вашем компьютере откройте браузер и перейдите на:
- https://softdab.tech
- https://softdab.tech/api/health (должен вернуть JSON)

### Шаг 22: Тестируйте контактную форму

Заполните и отправьте контактную форму на сайте.

---

## 🔧 Полезные команды для управления

### На сервере:

```bash
# Перезапустить бэкенд
systemctl restart softdab-backend

# Перезапустить Nginx
systemctl restart nginx

# Просмотр логов в реальном времени
journalctl -u softdab-backend -f

# Проверка статуса портов
netstat -tulpn | grep -E '(80|443|8000)'

# Проверка процессов
ps aux | grep -E '(nginx|uvicorn)'
```

---

## 🚨 Решение проблем

### Проблема: Бэкенд не запускается

```bash
# Проверьте логи
journalctl -u softdab-backend -n 100

# Проверьте .env файл
cat /var/www/softdab/backend/.env

# Попробуйте запустить вручную
cd /var/www/softdab/backend
source .venv/bin/activate
python -m uvicorn server:app --host 0.0.0.0 --port 8000
```

### Проблема: 502 Bad Gateway

```bash
# Проверьте, работает ли бэкенд
curl http://127.0.0.1:8000/api/contact

# Проверьте nginx логи
tail -n 50 /var/log/nginx/softdab-error.log
```

### Проблема: CORS ошибки

Убедитесь, что в `.env` файле правильно указаны домены:
```bash
nano /var/www/softdab/backend/.env
# CORS_ORIGINS должен содержать ваш домен
```

---

## 📝 Чеклист перед запуском

- [ ] Сервер обновлен
- [ ] Установлены все зависимости (Python, Nginx, Node.js)
- [ ] Firewall настроен
- [ ] Репозиторий склонирован
- [ ] Python окружение создано и зависимости установлены
- [ ] .env файл создан с реальными паролями
- [ ] Systemd сервис настроен и запущен
- [ ] Nginx настроен
- [ ] Фронтенд собран и загружен
- [ ] SSL сертификат установлен
- [ ] Сайт доступен по HTTPS
- [ ] Контактная форма работает

---

## 🎉 Готово!

После выполнения всех шагов ваш сайт должен быть доступен по адресу:
**https://softdab.tech**

Для обновления сайта в будущем используйте скрипт:
```bash
./deployment/deploy.sh
```
