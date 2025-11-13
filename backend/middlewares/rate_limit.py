"""
Rate limiting middleware с использованием встроенной реализации
"""
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import time
import os
import logging
from collections import defaultdict
from typing import Dict, Tuple

logger = logging.getLogger(__name__)

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.request_counts: Dict[str, Tuple[int, float]] = defaultdict(lambda: (0, 0.0))
        # Configurable via environment
        self.rate_limit = int(os.environ.get('RATE_LIMIT_REQUESTS_PER_MINUTE', os.environ.get('RATE_LIMIT_MAX_REQUESTS', '100')))
        self.window = int(os.environ.get('RATE_LIMIT_WINDOW_SECONDS', '60'))
        self.log_blocked = os.environ.get('RATE_LIMIT_LOG_BLOCKED', 'true').lower() in ('1','true','yes')

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
            retry_after = str(int(window_start + self.window - current_time))
            if self.log_blocked:
                logger.warning(f"rate_limit_block ip={client_ip} limit={self.rate_limit} window={self.window}s retry_after={retry_after}")
            return JSONResponse(
                {"detail": "Too many requests"},
                status_code=429,
                headers={"Retry-After": retry_after}
            )
        
        # Обновляем счетчик
        self.request_counts[client_ip] = (count + 1, window_start)
        
        return await call_next(request)

    def reset(self):
        """Сбрасывает все счетчики (для тестов)"""
        self.request_counts.clear()