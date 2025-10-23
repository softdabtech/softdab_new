from fastapi import APIRouter, Request, HTTPException
from database import unsubscribe_email

router = APIRouter()

@router.get("/unsubscribe")
async def unsubscribe(email: str, request: Request):
    """Unsubscribe email from marketing emails"""
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Invalid email")
    result = await unsubscribe_email(email)
    if result:
        return {"status": "success", "message": f"{email} unsubscribed from marketing emails."}
    else:
        raise HTTPException(status_code=500, detail="Failed to unsubscribe email")
