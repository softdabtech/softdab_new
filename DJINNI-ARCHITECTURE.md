# Djinni Integration - Visual Guide

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER VISITS CAREERS PAGE                  │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
            ┌──────────────────┐      ┌──────────────────┐
            │   Page Loads     │      │  Browser Cache   │
            │  (CareersPage)   │      │    (if exists)   │
            └────────┬─────────┘      └──────────────────┘
                     │
                     ├─ Check: Is cache valid?
                     │
        ┌────────────┴────────────┐
        │                         │
       YES                       NO
        │                         │
        ▼                         ▼
   ┌────────────┐        ┌──────────────────────┐
   │  Use Cache │        │ Fetch from Backend   │
   │ (30 mins)  │        │ /api/careers/pos...  │
   └────────────┘        └──────────┬───────────┘
        │                           │
        │                ┌──────────┴──────────┐
        │                │                     │
        │                ▼                     ▼
        │         ┌──────────────┐    ┌───────────────┐
        │         │  Authenticate│    │   Get Token   │
        │         │ with Djinni  │    │   (if needed) │
        │         └──────┬───────┘    └──────┬────────┘
        │                │                    │
        │        ┌───────┴─────────────────────┘
        │        │
        │        ▼
        │   ┌──────────────────────────┐
        │   │ Fetch Jobs from Djinni   │
        │   │  API /api/v2/jobs/...    │
        │   └──────┬───────────────────┘
        │          │
        │    ┌─────┴──────┐
        │    │            │
        │   YES          NO
        │    │            │
        │    │            └──→ Public API Fallback
        │    │
        │    ▼
        │  ┌────────────────────────────┐
        │  │ Transform Job Data Format  │
        │  │ - Title                    │
        │  │ - Location                 │
        │  │ - Experience               │
        │  │ - Technologies             │
        │  └──────┬─────────────────────┘
        │         │
        │         ▼
        │    ┌─────────────────────┐
        │    │  Cache for 30 mins  │
        │    └──────┬──────────────┘
        │           │
        └───────────┴──────┐
                           │
                           ▼
                    ┌──────────────────┐
                    │  Return JSON     │
                    │  {success: true, │
                    │   source: "djinni"│
                    │   positions: [...]}
                    └──────┬───────────┘
                           │
                           ▼
                    ┌──────────────────┐
                    │ Frontend Renders │
                    │ Job Cards        │
                    └──────────────────┘
                           │
                           ▼
                    ┌──────────────────┐
                    │ User Sees Jobs   │
                    │ on Careers Page  │
                    └──────────────────┘
```

## Component Architecture

```
CareersPage.jsx
│
├── State:
│   ├── positions[] - Job listings
│   ├── loading - Fetch status
│   └── error - Error message
│
├── Effects:
│   ├── useEffect #1 - Fetch from API
│   │   └── GET /api/careers/positions
│   │
│   └── useEffect #2 - SEO metadata
│       └── Set title, meta, schema
│
└── Render:
    ├── If loading → Show spinner
    ├── If error → Show message
    ├── If empty → "No positions"
    └── If has jobs → Map & display cards
```

## Backend Architecture

```
server.py
│
├── Imports:
│   └── from routes.djinni import router
│
└── Routes:
    └── include_router(djinni_router)
        │
        └── /api/careers/
            ├── GET /positions
            │   └── get_career_positions()
            │       └── get_cached_or_fresh_jobs()
            │           ├── Check cache
            │           ├── If expired:
            │           │   ├── get_djinni_token()
            │           │   ├── fetch_djinni_jobs(token)
            │           │   │   └── transform_djinni_job()
            │           │   └── Update cache
            │           └── Return jobs
            │
            └── GET /positions/refresh
                └── refresh_positions()
                    └── Clear cache + fetch fresh
```

## Cache Flow

```
Request comes in
    │
    ▼
Is cache initialized?
    │
    ├─ NO → Cache = None (first run)
    │
    └─ YES → Check age
        │
        ├─ Fresh (< 30 min) → Return cache ✓
        │
        └─ Stale (> 30 min)
            │
            ├─ Try fetch fresh
            │   ├─ Success → Update cache + return
            │   └─ Failure → Return old cache (graceful)
            │
```

## Error Handling Tree

```
API Call
    │
    ├─ Network Error
    │   └─ Return cached (if available)
    │   └─ Else return empty list
    │
    ├─ Auth Error (401)
    │   └─ Try public endpoint
    │   └─ If fails, return empty
    │
    ├─ Timeout (> 10s)
    │   └─ Return cached (if available)
    │
    └─ Success (200)
        ├─ Transform data
        ├─ Cache results
        └─ Return jobs
```

## Frontend Error States

```
┌─────────────────────────────────────┐
│     Fetch from /api/careers/positions│
└────────────────┬────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
┌─────────┐          ┌──────────────┐
│ Success │          │ Failure      │
└────┬────┘          └────┬─────────┘
     │                    │
     ▼                    ▼
  Has items?         Use DEFAULT_POSITIONS
     │                    │
    YES   NO              │
     │    │               │
     │    └───┐       ┌───┘
     │        │       │
     ▼        ▼       ▼
  Show   "No open   Show default
  Jobs   positions"  fallback jobs
```

## Request Timeline (Happy Path)

```
Time    Event
──────────────────────────────────────────────────────
0ms     User loads careers page
        CareersPage.jsx renders
        useEffect triggered

10ms    fetch('/api/careers/positions') called
        Backend receives request

15ms    Check cache
        Cache is stale (> 30 min)

20ms    Authenticate with Djinni
        POST to /auth/login

150ms   Receive auth token
        
160ms   Fetch jobs from Djinni
        GET /jobs with token

500ms   Receive jobs JSON
        Transform to app format

510ms   Update cache
        Store in _djinni_cache

520ms   Return response to frontend
        JSON sent over network

530ms   Frontend setPositions()
        Re-render triggered

550ms   Loading spinner hidden
        Job cards displayed

600ms   User sees jobs ✓
```

## Caching Timeline

```
00:00 - First request
        ├─ Cache = None
        ├─ Fetch from Djinni
        └─ Cache created

00:15 - Second request
        ├─ Cache age = 15 min
        ├─ < 30 min? YES
        └─ Return cache (fast!)

00:45 - Third request
        ├─ Cache age = 45 min
        ├─ < 30 min? NO
        ├─ Try fetch Djinni
        ├─ Success? Update cache
        └─ Failure? Return old cache

01:00 - Fourth request
        ├─ Cache age = 15 min (reset)
        ├─ < 30 min? YES
        └─ Return cache
```

## Database vs Cache

```
┌─────────────────────────────────┐
│     Frontend Request             │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│   Memory Cache (30 min)          │
│   _djinni_cache                 │
│   _cache_timestamp              │
└────────────┬────────────────────┘
             │
         Fresh?
       ┌─────┴─────┐
      YES         NO
       │           │
    Return      Fetch
     ✓ fast     from API
             ├─ Success:
             │  Update cache
             │  Return data
             │
             └─ Failure:
                Return cached
                (graceful fallback)
```

## Deployment Stages

```
Development
    ├─ Test locally: localhost:8000
    ├─ Check /api/careers/positions
    └─ Verify jobs appear

Staging
    ├─ Deploy to staging server
    ├─ Test with real Djinni account
    ├─ Monitor logs for errors
    └─ Verify caching works

Production
    ├─ Deploy backend
    ├─ Deploy frontend
    ├─ Monitor /api/careers/positions
    ├─ Check response times
    ├─ Verify cache effectiveness
    └─ Monitor error rates
```

---

**This diagram helps visualize the complete flow from user click to job display.**

For detailed implementation, see: `DJINNI-INTEGRATION.md`
