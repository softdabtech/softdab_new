# Деплой backend на сервер

## Шаги для обновления .env на продакшн-сервере:

1. **Подключитесь к серверу по SSH:**
   ```bash
   ssh root@185.233.39.171
   ```

2. **Откройте .env файл:**
   ```bash
   nano /var/www/softdab/backend/.env
   ```

3. **Обновите SMTP_PASS на новый пароль:**
   ```
   SMTP_PASS=fytvi9-boszam-Zaqquq
   ```
   
   (или скопируйте весь .env из локального файла `backend/.env`)

4. **Сохраните и выйдите:**
   - Нажмите `Ctrl+O` для сохранения
   - Нажмите `Enter`
   - Нажмите `Ctrl+X` для выхода

5. **Перезапустите backend-сервис:**
   ```bash
   sudo systemctl restart softdab-backend
   sudo systemctl status softdab-backend
   ```

6. **Проверьте логи (если есть ошибки):**
   ```bash
   sudo journalctl -u softdab-backend -n 50 --no-pager
   ```

7. **Протестируйте отправку формы** на https://www.softdab.tech/contact

---

## Безопасность

- ✅ `.env` добавлен в `.gitignore`
- ✅ Старый пароль скомпрометирован и заменён
- ✅ `.env.example` обновлён (без секретов)
- ⚠️ Не коммитьте `.env` в Git!
