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


async def fetch_djinni_jobs() -> List[Dict[str, Any]]:
    """Fetch job listings from Djinni API using Basic Auth."""
    try:
        async with aiohttp.ClientSession() as session:
            auth = aiohttp.BasicAuth(DJINNI_EMAIL, DJINNI_PASSWORD)
            
            # Fetch company jobs with Basic Auth (endpoint: /api/v2/jobs/)
            async with session.get(
                f"{DJINNI_API_BASE}/jobs/",
                auth=auth,
                params={"limit": 100},
                timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    # API returns {"count": X, "items": [...], "total": Y}
                    return data.get("items", [])
                else:
                    logger.warning(f"Djinni API failed: HTTP {response.status}")
                    return []
    except Exception as e:
        logger.error(f"Error fetching Djinni jobs: {e}")
        return []


def transform_djinni_job(job: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Transform Djinni job format to our standard format."""
    try:
        # Extract technologies from primary/secondary keywords
        technologies = []
        if job.get("primary_keyword"):
            technologies.append(job["primary_keyword"])
        if job.get("secondary_keyword"):
            technologies.append(job["secondary_keyword"])
        
        # Map experience years to readable format
        exp_years = job.get("experience_years", 0)
        if exp_years == 0:
            experience = "0-1 years"
        elif exp_years < 2:
            experience = "1-2 years"
        elif exp_years < 5:
            experience = f"{int(exp_years)}+ years"
        else:
            experience = "5+ years"
        
        # Build location string
        location = job.get("location", "").strip()
        if not location:
            # Use remote_type if available
            remote_map = {
                "full_remote": "Remote",
                "office": "Office",
                "hybrid": "Hybrid"
            }
            location = remote_map.get(job.get("remote_type"), "Remote")
        
        # Get title
        title = job.get("position", "Unknown Position")
        
        # Build job URL
        url = job.get("public_url", f"https://djinni.co/jobs/{job.get('id')}/")
        
        return {
            "id": job.get("id"),
            "title": title,
            "location": location,
            "type": "Full-time",
            "experience": experience,
            "technologies": technologies,
            "url": url,
            "description": "",  # Description is HTML, skip for now
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
    raw_jobs = await fetch_djinni_jobs()
    
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
