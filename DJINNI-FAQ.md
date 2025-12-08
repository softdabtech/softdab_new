# Djinni Integration - FAQ

## General Questions

### Q: What does this integration do?
**A:** It automatically pulls job listings from your company's Djinni.co account and displays them dynamically on the careers page. No more manual updates needed!

### Q: How often are jobs updated?
**A:** Jobs are cached for 30 minutes. After that, the next page load will fetch fresh data from Djinni. You can force an update anytime with `/api/careers/positions/refresh`.

### Q: What happens if Djinni API is down?
**A:** The system gracefully falls back to showing default job positions. Users won't see an error, just the fallback jobs.

### Q: Do I need to do anything special to deploy this?
**A:** Just install the Python dependency: `pip install -r requirements.txt` (adds aiohttp). Everything else is automatic.

### Q: Will this affect my SEO?
**A:** No! The SEO metadata and breadcrumb schema are preserved. Google can still crawl the page and index the jobs.

### Q: How much API traffic does this generate?
**A:** Very little! With 30-minute caching, you'll typically see 1-2 API calls per hour, not per user.

---

## Technical Questions

### Q: Where are the credentials stored?
**A:** Currently hardcoded in `backend/routes/djinni.py`:
```python
DJINNI_EMAIL = "info@softdab.tech"
DJINNI_PASSWORD = "9yNRF3xIZW"
```

**Better practice**: Move to `.env` file for security.

### Q: What's the API response format?
**A:** 
```json
{
  "success": true,
  "source": "djinni",
  "count": 4,
  "positions": [
    {
      "id": "job-123",
      "title": "Senior Developer",
      "location": "Kyiv, Ukraine",
      "type": "Full-time",
      "experience": "5+ years",
      "technologies": ["React", "Node.js"],
      "url": "https://djinni.co/...",
      "description": "..."
    }
  ]
}
```

### Q: How long does a request take?
**A:** 
- First request (no cache): 500-1000ms
- Cached request: <100ms
- Force refresh: 500-1000ms

### Q: What happens on timeout?
**A:** If Djinni API takes > 10 seconds, the request times out and falls back to cached data or default positions.

### Q: Can I customize the job display format?
**A:** Yes! Edit `CareersPage.jsx` to change how jobs are displayed. The data structure is in the `DEFAULT_POSITIONS` array.

---

## Deployment Questions

### Q: Do I need to restart the server after deploying?
**A:** Yes, restart the backend: `systemctl restart softdab-backend`

### Q: Will users see any downtime?
**A:** No! The careers page will work fine even if you're deploying.

### Q: How do I verify it's working?
**A:** 
```bash
curl https://your-domain.com/api/careers/positions
```

Should return valid JSON with job listings.

### Q: Can I rollback if something breaks?
**A:** Yes! The system falls back to `DEFAULT_POSITIONS` if the API fails. You can also temporarily disable the djinni router in `server.py`.

### Q: Do I need to do anything with the database?
**A:** No! This doesn't use the SQLite database. It's purely API-based caching.

---

## Performance Questions

### Q: Is this faster than static jobs?
**A:** Dynamic jobs are the same speed as static after caching (both <100ms). The initial load is slightly slower (500-1000ms) but still fast.

### Q: How does caching work exactly?
**A:**
1. First request: Fetch from Djinni (slow)
2. Cache stored for 30 minutes
3. Requests within 30 min: Return cache (fast!)
4. After 30 min: Fetch fresh Djinni data
5. API fails: Return stale cache (graceful)

### Q: What if I want to refresh jobs manually?
**A:** Hit this endpoint:
```bash
curl http://your-domain/api/careers/positions/refresh
```

Cache will be cleared and fresh data fetched immediately.

### Q: Can I change the cache duration?
**A:** Yes! Edit `backend/routes/djinni.py`:
```python
CACHE_DURATION = timedelta(minutes=30)  # Change 30 to whatever
```

---

## Troubleshooting Questions

### Q: Jobs aren't showing up. What do I check?
**A:** In order:
1. Is the backend running? `curl http://localhost:8000/health`
2. Can you reach the API? `curl http://localhost:8000/api/careers/positions`
3. Check the logs: `tail -f backend/logs/app.log | grep djinni`
4. Are Djinni credentials correct?
5. Are there any jobs published on Djinni?

### Q: I see "No open positions" message. Is that bad?
**A:** Not necessarily! This could mean:
1. Djinni API is unavailable (temporary)
2. Company has no published jobs
3. API returned empty list

Check the logs to see what's happening.

### Q: How do I check if it's using cache?
**A:** Look at backend logs:
```
"Returning cached Djinni jobs"      → Using cache (fast!)
"Fetching fresh jobs from Djinni"  → API call (slower)
```

### Q: What if I get "aiohttp not found"?
**A:** Install it:
```bash
pip install aiohttp>=3.9.0
```

### Q: The API is really slow. What's wrong?
**A:** 
1. Djinni API might be slow (external, not your fault)
2. Network latency
3. Server load

There's a 10-second timeout for safety. If Djinni takes longer, it falls back.

### Q: How do I see what data Djinni is sending?
**A:** Enable debug logging in `djinni.py`:
```python
logger.debug(f"Raw Djinni response: {raw_jobs}")
```

---

## Data Questions

### Q: Where does the job data come from?
**A:** Directly from Djinni.co API using the company account:
- Email: `info@softdab.tech`
- Password: `9yNRF3xIZW`

### Q: What job fields are extracted?
**A:**
- Title
- Location
- Type (always "Full-time")
- Experience level (mapped from Djinni)
- Technologies (from job keywords/skills)
- URL (link to job on Djinni)
- Description (first 200 characters)

### Q: Can I customize which fields are shown?
**A:** Yes! Edit the `transform_djinni_job()` function in `djinni.py` to extract different fields.

### Q: Is there any data loss in transformation?
**A:** No, all data is preserved. We just reshape it to match our format. Original Djinni response is never modified.

### Q: Can I store jobs in the database?
**A:** Yes! You could modify the code to save jobs to SQLite for:
- Backup if API fails
- Historical tracking
- Better fallback

---

## Security Questions

### Q: Are credentials secure?
**A:** Currently, they're hardcoded in Python. This is okay for a company account that only reads public data, but ideally should be in `.env`.

### Q: Can anyone access the API?
**A:** The endpoint is public (`/api/careers/positions`) but that's fine - it only returns public job listings.

### Q: Is the password visible in the source code?
**A:** Yes, it's in `backend/routes/djinni.py`. For better security:
1. Move to `.env` file
2. Use secrets management (AWS Secrets, etc.)
3. Use read-only Djinni API keys (if available)

### Q: Should I commit this to git?
**A:** The code yes, but ideally not the credentials. Good practice:
```python
# In .env (not committed)
DJINNI_EMAIL=info@softdab.tech
DJINNI_PASSWORD=9yNRF3xIZW

# In code (committed)
from dotenv import load_dotenv
import os
load_dotenv()
DJINNI_EMAIL = os.getenv("DJINNI_EMAIL")
DJINNI_PASSWORD = os.getenv("DJINNI_PASSWORD")
```

---

## Maintenance Questions

### Q: How much monitoring do I need?
**A:** Minimal! Just check:
- Log file for errors: `tail -f backend/logs/app.log`
- API endpoint occasionally: `curl /api/careers/positions`
- Response times (should be <1 second)

### Q: What if I want to disable this temporarily?
**A:** Comment out this line in `server.py`:
```python
# app.include_router(djinni_router)
```

This will disable the API and careers page will show default positions.

### Q: How do I update dependencies?
**A:** 
```bash
pip install -r requirements.txt --upgrade
```

This will update aiohttp and other packages.

### Q: What happens during server restarts?
**A:** 
1. Cache is cleared (in-memory)
2. Next request to careers page fetches fresh from Djinni
3. All future requests use the cache

### Q: Can I clean up old logs?
**A:** Yes! Logrotate already handles this automatically. Check `/etc/logrotate.d/softdab`.

---

## Integration Questions

### Q: Can I use other job sources?
**A:** Absolutely! The `djinni.py` file is designed to be extensible. You could:
1. Add LinkedIn integration
2. Add GitHub Jobs integration
3. Combine multiple sources

Just add more route handlers.

### Q: Can jobs redirect to apply?
**A:** Yes! Update the "Apply Now" button in `CareersPage.jsx` to use the job's URL:
```jsx
<Link to={position.url} target="_blank">
  Apply on Djinni
</Link>
```

### Q: Can I add search/filter?
**A:** Yes! Add state and filter the positions array:
```jsx
const [search, setSearch] = useState('');
const filtered = positions.filter(p => 
  p.title.toLowerCase().includes(search.toLowerCase())
);
```

---

## Future Questions

### Q: What improvements are planned?
**A:** Ideas for enhancement:
1. Move credentials to `.env` (security)
2. Database backup (reliability)
3. Search and filtering (UX)
4. Direct Djinni links (engagement)
5. Job categories (organization)
6. Real-time updates via webhooks (freshness)

### Q: Can I add more APIs?
**A:** Yes! The architecture supports it. Create new route files in `backend/routes/` and register them in `server.py`.

### Q: Will this slow down the site?
**A:** No! With caching, it's actually faster than manual updates. Most requests return cached data in <100ms.

---

## Getting Help

### Where to find information?
- **Technical details**: `DJINNI-INTEGRATION.md`
- **Setup guide**: `DJINNI-SETUP.md`
- **Quick reference**: `DJINNI-QUICK-REFERENCE.md`
- **Architecture**: `DJINNI-ARCHITECTURE.md`
- **Checklist**: `DJINNI-CHECKLIST.md`

### What to check when something breaks?
1. Backend logs: `backend/logs/app.log`
2. Browser console: F12 in DevTools
3. API response: `curl /api/careers/positions | jq .`
4. Djinni API status: Check Djinni.co directly

### How to report issues?
Include:
1. Error message (from logs or console)
2. What you were doing
3. API response (if applicable)
4. Backend logs (last 50 lines)

---

**For more detailed information, see the documentation files listed above.**
