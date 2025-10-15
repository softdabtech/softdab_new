def validate_csrf_token(request):
    """Заглушка для совместимости импорта. Реальная проверка реализована в CSRFMiddleware."""
    return True
"""
Middleware для проверки CSRF токена
"""
from fastapi import Request, HTTPException
from typing import Callable
import os

class CSRFMiddleware:
    def __init__(self):
        self.csrf_token_header = "X-CSRF-Token"
        self.csrf_cookie_name = "csrf_token"

    async def __call__(self, request: Request, call_next: Callable):
        # Пропускаем методы GET, HEAD, OPTIONS
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return await call_next(request)

        # Проверяем наличие CSRF токена
        csrf_token_header = request.headers.get(self.csrf_token_header)
        csrf_token_cookie = request.cookies.get(self.csrf_cookie_name)

        if not csrf_token_header or not csrf_token_cookie or csrf_token_header != csrf_token_cookie:
            raise HTTPException(status_code=403, detail="Invalid CSRF token")

        response = await call_next(request)
        return response