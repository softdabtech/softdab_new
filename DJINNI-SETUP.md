# Djinni Integration - Setup & Deployment

## Installation

### 1. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

This will install `aiohttp>=3.9.0` needed for async HTTP requests to Djinni API.

### 2. Server Configuration

The djinni router is already integrated into `server.py`:
- Import: `from routes.djinni import router as djinni_router`
- Registration: `app.include_router(djinni_router)`

### 3. Frontend Ready

The CareersPage is updated to fetch from `/api/careers/positions` automatically.

## Running Locally

### Start Backend Server

```bash
cd backend
python server.py
```

Server runs on `http://localhost:8000` (default)

### Test API Endpoints

```bash
# Fetch career positions (with caching)
curl http://localhost:8000/api/careers/positions

# Force refresh (clear cache and fetch fresh)
curl http://localhost:8000/api/careers/positions/refresh
```

### Expected Response

```json
{
  "success": true,
  "source": "djinni",
  "count": 4,
  "positions": [
    {
      "id": "...",
      "title": "Senior Developer",
      "location": "Ukraine / Kyiv",
      "type": "Full-time",
      "experience": "5+ years",
      "technologies": ["React", "Node.js"],
      "url": "...",
      "description": "..."
    }
  ]
}
```

## Troubleshooting

### API Returns Empty List

**Likely Cause**: Djinni API credentials or endpoint issue

**Solution**:
1. Check credentials in `backend/routes/djinni.py`:
   - `DJINNI_EMAIL = "info@softdab.tech"`
   - `DJINNI_PASSWORD = "9yNRF3xIZW"`

2. Check server logs for error messages
3. Test with: `curl http://localhost:8000/api/careers/positions/refresh`

### "No open positions" Message on Frontend

**Expected Behavior**: If Djinni API fails or returns no jobs, frontend shows this message.

**To Revert to Default Positions**: 
- Backend will return empty list gracefully
- Frontend shows DEFAULT_POSITIONS array as fallback (check CareersPage.jsx)

### ImportError: aiohttp

**Fix**:
```bash
pip install aiohttp>=3.9.0
```

## Deployment

### Production Build

```bash
# Backend: No changes needed, just ensure aiohttp is in requirements.txt
cd backend && pip install -r requirements.txt

# Frontend: Build as usual
cd frontend && npm run build
```

### Environment Variables (Optional Future)

Currently credentials are hardcoded. To make secure:

1. Update `backend/.env`:
```
DJINNI_EMAIL=info@softdab.tech
DJINNI_PASSWORD=9yNRF3xIZW
```

2. Update `backend/routes/djinni.py`:
```python
from dotenv import load_dotenv
import os

DJINNI_EMAIL = os.getenv("DJINNI_EMAIL", "info@softdab.tech")
DJINNI_PASSWORD = os.getenv("DJINNI_PASSWORD", "9yNRF3xIZW")
```

## Monitoring

### Check Caching

Backend logs will show:
- `Returning cached Djinni jobs` - Using cache
- `Fetching fresh jobs from Djinni API` - API call made
- `Cached N jobs from Djinni` - Cache updated

### Monitor API Calls

With 30-minute cache, API is called:
- On first request
- After 30 minutes
- When `/refresh` endpoint is hit manually
- On server restart (cache cleared)

## Rollback

If issues arise:

1. **Revert Frontend**: Delete fetch code, use DEFAULT_POSITIONS
2. **Disable API**: Remove djinni_router registration from server.py
3. **Remove Dependency**: Remove aiohttp from requirements.txt

All handled gracefully with fallback positions.
