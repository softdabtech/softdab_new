"""
Djinni API integration for careers page.
Fetches job listings from Djinni.co and transforms them for frontend consumption.
"""

import logging
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any

import aiohttp
from fastapi import APIRouter, HTTPException

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/careers", tags=["careers"])

# Cache to avoid excessive API calls
_djinni_cache: Optional[List[Dict[str, Any]]] = None
_cache_timestamp: Optional[datetime] = None
CACHE_DURATION = timedelta(minutes=30)  # Refresh every 30 minutes

DJINNI_API_BASE = "https://djinni.co/api/v2"
DJINNI_EMAIL = "info@softdab.tech"
DJINNI_PASSWORD = "9yNRF3xIZW"


async def get_djinni_token() -> Optional[str]:
    """Authenticate with Djinni API and get access token."""
    try:
        async with aiohttp.ClientSession() as session:
            # Try basic auth first (most common for Djinni)
            auth = aiohttp.BasicAuth(DJINNI_EMAIL, DJINNI_PASSWORD)
            
            async with session.post(
                f"{DJINNI_API_BASE}/auth/login",
                auth=auth,
                timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    return data.get("access_token") or "authenticated"
                elif response.status == 401:
                    logger.warning("Djinni auth failed: Invalid credentials")
                    return None
                else:
                    logger.warning(f"Djinni auth failed: {response.status}")
                    return None
    except Exception as e:
        logger.error(f"Error getting Djinni token: {e}")
        return None


async def fetch_djinni_jobs_public() -> List[Dict[str, Any]]:
    """Fetch job listings from Djinni API using public endpoint."""
    try:
        async with aiohttp.ClientSession() as session:
            # Try public API endpoint first - Djinni has public job listings
            # Filter by company domain or keywords
            async with session.get(
                f"{DJINNI_API_BASE}/jobs",
                params={
                    "keywords": "softdab",
                    "page": 1,
                    "limit": 100
                },
                timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    return data.get("results", []) if isinstance(data, dict) else data
                else:
                    logger.warning(f"Djinni jobs fetch failed: {response.status}")
                    return []
    except Exception as e:
        logger.error(f"Error fetching Djinni jobs (public): {e}")
        return []


async def fetch_djinni_jobs(token: Optional[str]) -> List[Dict[str, Any]]:
    """Fetch job listings from Djinni API with authentication."""
    try:
        async with aiohttp.ClientSession() as session:
            headers = {
                "Accept": "application/json"
            }
            
            if token:
                headers["Authorization"] = f"Bearer {token}"
            
            # Try authenticated endpoint for company-specific jobs
            async with session.get(
                f"{DJINNI_API_BASE}/company/jobs",
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    return data.get("results", []) if isinstance(data, dict) else data
                else:
                    logger.debug(f"Djinni company jobs endpoint failed: {response.status}")
                    # Fall back to public search
                    return await fetch_djinni_jobs_public()
    except Exception as e:
        logger.error(f"Error fetching Djinni jobs: {e}")
        # Fall back to public search
        return await fetch_djinni_jobs_public()


def transform_djinni_job(job: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Transform Djinni job format to our standard format."""
    try:
        # Extract technologies from job description or metadata
        technologies = []
        if "job_keywords" in job:
            technologies = [kw["name"] for kw in job.get("job_keywords", [])][:5]
        elif "skills" in job:
            technologies = [s for s in job.get("skills", [])][:5]
        elif "keywords" in job:
            technologies = job.get("keywords", [])[:5]
        
        # Map experience level
        experience_map = {
            "no_experience": "0+ years",
            "junior": "0-1 years",
            "middle": "2-4 years",
            "senior": "5+ years",
            "lead": "7+ years"
        }
        experience = experience_map.get(
            job.get("experience_level", "middle"),
            "3+ years"
        )
        
        # Build location string
        locations = []
        if job.get("country"):
            locations.append(job["country"].get("name", ""))
        if job.get("cities"):
            cities = job["cities"] if isinstance(job["cities"], list) else [job["cities"]]
            locations.extend([city.get("name", "") if isinstance(city, dict) else city for city in cities[:2]])
        location = " / ".join(filter(None, locations)) or "Remote"
        
        # Get title
        title = job.get("title") or job.get("position") or "Unknown Position"
        
        return {
            "id": job.get("id"),
            "title": title,
            "location": location,
            "type": "Full-time",  # Djinni doesn't always specify, assume full-time
            "experience": experience,
            "technologies": technologies or [],
            "url": job.get("url", ""),
            "description": job.get("description_short", "")[:200] if job.get("description_short") else "",
        }
    except Exception as e:
        logger.error(f"Error transforming Djinni job: {e}")
        return None


async def get_cached_or_fresh_jobs() -> List[Dict[str, Any]]:
    """Get jobs from cache if fresh, otherwise fetch from API."""
    global _djinni_cache, _cache_timestamp
    
    # Check if cache is still valid
    if _djinni_cache is not None and _cache_timestamp is not None:
        if datetime.now() - _cache_timestamp < CACHE_DURATION:
            logger.info("Returning cached Djinni jobs")
            return _djinni_cache
    
    logger.info("Fetching fresh jobs from Djinni API")
    
    # Get fresh data
    token = await get_djinni_token()
    raw_jobs = await fetch_djinni_jobs(token)
    
    if not raw_jobs:
        logger.warning("No jobs received from Djinni API")
        # Return cached data if available, even if expired
        return _djinni_cache or []
    
    # Transform jobs to our format
    jobs = [
        transformed
        for job in raw_jobs
        if (transformed := transform_djinni_job(job)) is not None
    ]
    
    # Update cache
    _djinni_cache = jobs
    _cache_timestamp = datetime.now()
    
    logger.info(f"Cached {len(jobs)} jobs from Djinni")
    return jobs


@router.get("/positions")
async def get_career_positions():
    """Get open positions from Djinni API or fallback to defaults."""
    try:
        jobs = await get_cached_or_fresh_jobs()
        
        if jobs:
            return {
                "success": True,
                "source": "djinni",
                "count": len(jobs),
                "positions": jobs
            }
        else:
            # Fallback to default positions if Djinni API fails
            logger.warning("Djinni API unavailable, returning default positions")
            return {
                "success": True,
                "source": "fallback",
                "count": 0,
                "positions": []
            }
    except Exception as e:
        logger.error(f"Error in get_career_positions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch career positions")


@router.get("/positions/refresh")
async def refresh_positions():
    """Force refresh of job listings from Djinni."""
    global _djinni_cache, _cache_timestamp
    
    # Clear cache
    _djinni_cache = None
    _cache_timestamp = None
    
    # Fetch fresh
    jobs = await get_cached_or_fresh_jobs()
    
    return {
        "success": True,
        "message": "Career positions refreshed",
        "count": len(jobs),
        "positions": jobs
    }
