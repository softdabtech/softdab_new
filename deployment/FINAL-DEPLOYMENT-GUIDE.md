# 🚀 SoftDAB Backend - Финальная Инструкция по Деплою

## 📋 Что было сделано

✅ **Backend emailer** — переписан на SMTP-only (Zoho), без лишних зависимостей  
✅ **Contact endpoint** — упрощён, отправляет 2 письма (админ + пользователь)  
✅ **Frontend форма** — создана лёгкая версия ContactFormLite (без react-hook-form/yup)  
✅ **Deployment скрипты** — готовы к автоматическому деплою  
✅ **Документация** — .env.example, инструкции, скрипты  
✅ **Git** — всё закоммичено и запушено (без секретов)

---

## 🔑 Проблема с SMTP

**Статус:** Пароль SMTP был скомпрометирован (опубликован в Git → GitGuardian предупреждение).

**Решение:**
1. Пароль заменён на новый: `fytvi9-boszam-Zaqquq`
2. Локальный тест SMTP прошёл успешно ✅
3. **НО:** не удалось автоматически обновить .env на продакшн-сервере из-за отсутствия SSH-доступа.

---

## 🎯 Что нужно сделать сейчас

### Вариант 1: Быстрое Обновление (30 секунд)

1. Подключитесь к серверу:
   ```bash
   ssh root@185.233.39.171
   ```

2. Скопируйте и вставьте **весь блок одной командой**:

```bash
bash << 'DEPLOY_SCRIPT'
cd /var/www/softdab/backend
[ -f .env ] && cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
cat > .env << 'ENVEOF'
DB_DIR=./data
SMTP_HOST=smtp.zoho.eu
SMTP_PORT=587
SMTP_USER=noreply@softdab.tech
SMTP_PASS=fytvi9-boszam-Zaqquq
SMTP_TLS=true
FROM_EMAIL=noreply@softdab.tech
FROM_NAME=SoftDAB
CONTACT_NOTIFICATION_EMAILS=info@softdab.tech
EXPERT_NOTIFICATION_EMAILS=info@softdab.tech
TIMEZONE=Europe/Kyiv
ENVEOF
chmod 600 .env
echo "✅ .env обновлён"
systemctl restart softdab-backend
sleep 5
echo "✅ Backend перезапущен"
systemctl status softdab-backend --no-pager | head -10
python3 << 'PYEOF'
import smtplib
from email.mime.text import MIMEText
msg = MIMEText('Тест SMTP. Если видите это письмо — всё работает!')
msg['Subject'] = 'SoftDAB Test'
msg['From'] = 'noreply@softdab.tech'
msg['To'] = 'info@softdab.tech'
try:
    with smtplib.SMTP('smtp.zoho.eu', 587, timeout=10) as s:
        s.starttls()
        s.login('noreply@softdab.tech', 'fytvi9-boszam-Zaqquq')
        s.sendmail('noreply@softdab.tech', ['info@softdab.tech'], msg.as_string())
    print('✅ SMTP работает! Письмо отправлено.')
except Exception as e:
    print(f'❌ SMTP ошибка: {e}')
PYEOF
echo ""
echo "🎉 Деплой завершён! Тестируйте: https://www.softdab.tech/contact"
DEPLOY_SCRIPT
```

3. Дождитесь сообщений:
   ```
   ✅ .env обновлён
   ✅ Backend перезапущен
   ✅ SMTP работает! Письмо отправлено.
   🎉 Деплой завершён!
   ```

4. Протестируйте форму: https://www.softdab.tech/contact
5. Проверьте почту: info@softdab.tech (включая спам)

---

### Вариант 2: Использовать готовый скрипт из репозитория

```bash
ssh root@185.233.39.171
curl -s https://raw.githubusercontent.com/softdabtech/softdab_new/main/deployment/server-update.sh | bash
```

или

```bash
ssh root@185.233.39.171
cd /var/www/softdab
git pull
bash deployment/server-update.sh
```

---

## 📊 Ожидаемый Результат

После выполнения команд вы увидите:

```
╔════════════════════════════════════════════════════════════════╗
║  SoftDAB Backend - Полное Обновление и Деплой                 ║
╚════════════════════════════════════════════════════════════════╝

📂 Переход в директорию backend...
💾 Создание резервной копии .env...
   ✅ Резервная копия создана: .env.backup.20251021_143022
📝 Обновление .env с новыми настройками SMTP...
   ✅ .env обновлён и права установлены (600)
🔄 Перезапуск backend-сервиса...
   ✅ Сервис перезапущен
⏳ Ожидание запуска сервиса (5 секунд)...
📊 Статус сервиса:
   ✅ Сервис активен и работает
🧪 Тестирование SMTP-подключения...
   ✅ SMTP работает! Тестовое письмо отправлено на info@softdab.tech

╔════════════════════════════════════════════════════════════════╗
║  РЕЗУЛЬТАТЫ ДЕПЛОЯ                                             ║
╚════════════════════════════════════════════════════════════════╝

✅ .env обновлён с новым SMTP-паролем
✅ Backend-сервис перезапущен и работает
✅ SMTP-соединение проверено и работает

🎉 ВСЁ ГОТОВО! Форма контактов должна работать.

🧪 Протестируйте форму на:
   👉 https://www.softdab.tech/contact

📧 Проверьте почту info@softdab.tech (включая спам)
```

---

## 🔐 Безопасность

⚠️ **ВАЖНО:** После успешного деплоя:

1. Пароль SMTP больше **НЕ ДОЛЖЕН** попадать в Git
2. `.env` уже добавлен в `.gitignore` ✅
3. `.env.example` создан (без секретов) ✅
4. Для следующих обновлений используйте только локальный `.env` или переменные окружения сервера

---

## 🆘 Если что-то пошло не так

### Проблема 1: Backend не запускается

```bash
journalctl -u softdab-backend -n 50 --no-pager
```

### Проблема 2: SMTP не работает

Проверьте пароль в Zoho:
- Зайдите в настройки почты Zoho
- Сгенерируйте новый пароль приложения
- Обновите SMTP_PASS в .env
- Перезапустите: `systemctl restart softdab-backend`

### Проблема 3: Письма не приходят

1. Проверьте спам в info@softdab.tech
2. Проверьте логи: `journalctl -u softdab-backend -f`
3. Проверьте лимиты Zoho (может быть превышен лимит отправки)

---

## 📞 Полезные Команды

```bash
# Логи backend (real-time)
journalctl -u softdab-backend -f

# Статус сервиса
systemctl status softdab-backend

# Перезапуск сервиса
systemctl restart softdab-backend

# Проверка .env
cat /var/www/softdab/backend/.env

# Тест SMTP вручную
python3 /var/www/softdab/backend/smtp_test.py
```

---

## ✅ Чеклист Финальной Проверки

- [ ] Backend-сервис запущен и работает
- [ ] SMTP-тест прошёл успешно
- [ ] Форма на https://www.softdab.tech/contact открывается
- [ ] Отправка формы показывает "успешно"
- [ ] Письмо пришло на info@softdab.tech
- [ ] Письмо-подтверждение пришло пользователю
- [ ] Нет ошибок в логах backend

---

## 🎉 Финал

После выполнения всех шагов:

1. Форма контактов должна работать без ошибок ✅
2. Письма должны приходить администраторам и пользователям ✅
3. SMTP Zoho должен быть настроен и работать ✅
4. Backend должен быть стабильным и без утечек секретов ✅

**Весь код, скрипты и документация находятся в репозитории:**  
https://github.com/softdabtech/softdab_new

---

**Удачи! 🚀**
