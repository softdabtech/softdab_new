"""
Rate limiting middleware с использованием встроенной реализации
"""
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import time
from collections import defaultdict
from typing import Dict, Tuple

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.request_counts: Dict[str, Tuple[int, float]] = defaultdict(lambda: (0, 0.0))
        self.rate_limit = 100  # requests per minute
        self.window = 60  # seconds

    async def dispatch(self, request, call_next):
        client_ip = request.client.host if hasattr(request, 'client') and hasattr(request.client, 'host') else '127.0.0.1'
        
        # Проверяем и обновляем счетчик запросов
        count, window_start = self.request_counts[client_ip]
        current_time = time.time()
        
        # Если окно истекло, сбрасываем счетчик
        if current_time - window_start >= self.window:
            count = 0
            window_start = current_time
        
        # Если лимит превышен, возвращаем ошибку
        if count >= self.rate_limit:
            return JSONResponse(
                {"detail": "Too many requests"},
                status_code=429,
                headers={"Retry-After": str(int(window_start + self.window - current_time))}
            )
        
        # Обновляем счетчик
        self.request_counts[client_ip] = (count + 1, window_start)
        
        return await call_next(request)

    def reset(self):
        """Сбрасывает все счетчики (для тестов)"""
        self.request_counts.clear()