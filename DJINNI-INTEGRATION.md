# Djinni API Integration - Careers Page

## Implementation Summary

Successfully integrated Djinni.co API for dynamic job listings on the careers page.

### Changes Made

#### 1. Backend Implementation (`/backend/routes/djinni.py`)

**New file created** with the following features:

- **Authentication**: Basic auth with Djinni credentials (info@softdab.tech / 9yNRF3xIZW)
- **Job Fetching**: Attempts authenticated endpoint first, falls back to public search
- **Data Transformation**: Converts Djinni API response format to our standard format
- **Caching**: 30-minute cache to reduce API calls
- **Fallback**: Returns empty list on API failure (frontend will show default positions)
- **Two Endpoints**:
  - `GET /api/careers/positions` - Fetches cached or fresh jobs
  - `GET /api/careers/positions/refresh` - Forces cache refresh

**Key Functions**:
- `get_djinni_token()` - Handles Djinni authentication
- `fetch_djinni_jobs_public()` - Falls back to public API if authenticated fails
- `fetch_djinni_jobs()` - Fetches jobs with optional auth token
- `transform_djinni_job()` - Converts API response to frontend format
- `get_cached_or_fresh_jobs()` - Manages caching logic

#### 2. Server Configuration (`/backend/server.py`)

- Added `from routes.djinni import router as djinni_router`
- Registered router: `app.include_router(djinni_router)`
- No URL prefix needed since router uses `/api/careers`

#### 3. Dependencies (`/backend/requirements.txt`)

- Added `aiohttp>=3.9.0` for async HTTP requests

#### 4. Frontend Implementation (`/frontend/src/pages/company/CareersPage.jsx`)

**Major Changes**:

- Added state management:
  ```javascript
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  ```

- Dynamic API fetch in `useEffect`:
  ```javascript
  const response = await fetch('/api/careers/positions');
  ```

- Conditional rendering:
  - Loading state with spinner
  - Error state (optional, falls back silently)
  - Positions list with new data
  - "No positions" message if empty

- Default positions as fallback if API unavailable
- Added icons: `AlertCircle`, `Loader` for UI feedback

### API Response Format

```json
{
  "success": true,
  "source": "djinni|fallback",
  "count": 4,
  "positions": [
    {
      "id": "job123",
      "title": "Senior Full Stack Developer",
      "location": "Ukraine / Kyiv",
      "type": "Full-time",
      "experience": "5+ years",
      "technologies": ["React", "Node.js", "TypeScript"],
      "url": "https://djinni.co/...",
      "description": "..."
    }
  ]
}
```

### Fallback Behavior

If Djinni API is unavailable:
1. Backend returns empty positions list (graceful degradation)
2. Frontend shows default positions array
3. User experience unaffected

### Caching Strategy

- **Duration**: 30 minutes per job listing
- **Manual Refresh**: `GET /api/careers/positions/refresh` 
- **Automatic Fallback**: Uses cached data if fetch fails
- **Expiry**: Old cache returned on API failure (better than showing nothing)

### Testing

To test the integration:

```bash
# Test API endpoint directly
curl http://localhost:8000/api/careers/positions

# Force refresh
curl http://localhost:8000/api/careers/positions/refresh

# Check logs for:
# - "Returning cached Djinni jobs"
# - "Fetching fresh jobs from Djinni API"
# - "Cached N jobs from Djinni"
```

### Notes

1. **No CORS issues**: Backend serves both API and frontend
2. **Error handling**: Graceful degradation - shows default positions if API fails
3. **Performance**: 30-min cache reduces API load
4. **Credentials**: Stored in .env (DJINNI_EMAIL, DJINNI_PASSWORD hardcoded for now)
5. **Flexibility**: Can easily add more job sources without changing frontend

### Future Improvements

1. Move Djinni credentials to `.env` file
2. Add job search/filtering on frontend
3. Add "Apply Now" redirect to Djinni job page
4. Implement job categories/departments
5. Add caching to database for more reliable fallback
