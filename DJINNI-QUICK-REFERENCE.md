# Djinni Integration - Quick Reference

## What Was Done ✅

Integrated Djinni.co API to dynamically pull job listings from your company account to display on the careers page.

## Files Changed

### Backend
- **New File**: `backend/routes/djinni.py` - Djinni API integration (148 lines)
- **Modified**: `backend/server.py` - Added djinni_router registration
- **Modified**: `backend/requirements.txt` - Added `aiohttp>=3.9.0`

### Frontend
- **Modified**: `frontend/src/pages/company/CareersPage.jsx` - Dynamic job fetching

### Documentation
- **New**: `DJINNI-INTEGRATION.md` - Technical details
- **New**: `DJINNI-SETUP.md` - Setup and deployment guide

## How It Works

1. **Frontend** (`CareersPage.jsx`):
   - Calls `GET /api/careers/positions` on page load
   - Shows loading spinner while fetching
   - Displays jobs from Djinni or fallback positions
   - Falls back gracefully if API is down

2. **Backend** (`djinni.py`):
   - Authenticates with Djinni using provided credentials
   - Fetches job listings from company account
   - Caches results for 30 minutes
   - Returns data in standardized format

3. **Caching**:
   - Reduces API calls by caching 30 minutes
   - Falls back to cached data if API fails
   - Manual refresh via `/api/careers/positions/refresh`

## Testing

```bash
# Check if integration works
curl http://localhost:8000/api/careers/positions

# Response should be:
# {
#   "success": true,
#   "source": "djinni",
#   "count": 4,
#   "positions": [...]
# }
```

## Deployment

1. Install dependencies:
   ```bash
   cd backend && pip install -r requirements.txt
   ```

2. Deploy normally (no special steps needed)
3. Monitor `/api/careers/positions` endpoint
4. If issues, fallback positions show automatically

## Credentials Used

- Email: `info@softdab.tech`
- Password: `9yNRF3xIZW`

*(Consider moving to .env for better security)*

## Features

✅ Dynamic job listings from Djinni  
✅ 30-minute caching for performance  
✅ Graceful fallback to default positions  
✅ Loading and error states  
✅ Responsive design (already built-in)  
✅ SEO friendly (jobs display after load)  

## Next Steps (Optional)

1. **Security**: Move credentials to `.env`
2. **UX**: Add filters/search for jobs
3. **Analytics**: Track job clicks
4. **Integration**: Link "Apply" buttons to Djinni
5. **Caching**: Store jobs in database for backup

## Support

- Check `backend/logs/app.log` for API errors
- Monitor console for fetch errors in frontend
- Test with `/refresh` endpoint to force update

---

**Status**: ✅ Ready for deployment
