# SkyCodec Production Deployment Guide

## Текущее состояние

### Production (sky.softdab.tech)
- **Алгоритм**: SkyCodec v2.0 (LZ77+RLE+Huffman+Delta)
- **API Endpoints**:
  - `POST /api/compress` - сжатие файла
  - `GET /api/download/{file_id}` - скачать сжатый файл
  - `POST /api/decompress` - декомпрессия
  - `GET /api/download-decompressed/{file_id}` - скачать распакованный файл
  - `GET /api/health` - health check

### Local Development
- **Алгоритм**: Split + XOR encryption
- **API Endpoints**:
  - `POST /api/skycodec/compress`
  - `GET /api/skycodec/download/{file_id}`
  - `POST /api/skycodec/decompress/{file_id}`
  - `GET /api/skycodec/download-decompressed/{file_id}`
  - `GET /api/skycodec/health`

## Проблема

Production использует **другой алгоритм** и **другую структуру API**, чем наш локальный код.

## Решение

### Вариант 1: Обновить Production (Рекомендуется)

Заменить код на продакшене нашей версией:

```bash
# На сервере sky.softdab.tech
cd /var/www/sky/backend

# Backup старого кода
cp routes/skycodec.py routes/skycodec.py.backup

# Скопировать новый код
# (нужно загрузить файл backend/routes/skycodec.py)

# Обновить server.py чтобы включить роутер
# Добавить:
# from routes.skycodec import router as skycodec_router
# app.include_router(skycodec_router, prefix="/api/skycodec", tags=["SkyCodec"])

# Перезапустить сервис
systemctl restart skycodec-backend
```

### Вариант 2: Адаптировать Local код к Production API

Изменить наши endpoint'ы чтобы совпадали с продакшеном:
- `/api/skycodec/compress` → `/api/compress`
- Добавить поддержку алгоритма LZ77+RLE+Huffman+Delta

## Тестирование Production API

```bash
# Сжатие
curl -X POST -F "file=@test.txt" -F "filename=test.txt" \
  https://sky.softdab.tech/api/compress

# Результат
{
  "file_id": "...",
  "filename": "....sky",
  "original_size": 100,
  "compressed_size": 90,
  "compression_ratio": 0.10,
  "algorithm": "SkyCodec v2.0 (LZ77+RLE+Huffman+Delta)",
  "download_url": "/api/download/..."
}

# Скачать
curl -o compressed.sky https://sky.softdab.tech/api/download/{file_id}

# Декомпрессия
curl -X POST -F "file=@compressed.sky" -F "filename=compressed.sky" \
  https://sky.softdab.tech/api/decompress

# Скачать распакованный
curl -o original.txt https://sky.softdab.tech/api/download-decompressed/{file_id}
```

## Frontend

Frontend на sky.softdab.tech ожидает определенный формат ответа. Убедитесь что API возвращает:

```json
{
  "file_id": "string",
  "filename": "string.sky",
  "original_size": number,
  "compressed_size": number,
  "compression_ratio": number (0-1),
  "download_url": "string"
}
```

## Debugging

Если ошибка 500:
1. Проверить логи: `/var/www/sky/backend/logs/`
2. Проверить консоль браузера (F12)
3. Проверить Network tab в DevTools
4. Убедиться что файл загружается с правильными полями: `file` и `filename`

## Next Steps

1. ✅ Локальный код работает правильно
2. ⚠️ Production API нужно обновить или адаптировать
3. 📝 Требуется решение: обновить прод или изменить локальный код
