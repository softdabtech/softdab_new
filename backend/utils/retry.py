"""
Утилиты для работы с email
"""
import asyncio
from typing import Callable, Any
from functools import wraps

def with_retry(
    max_attempts: int = 3,
    delay: float = 1.0,
    backoff_factor: float = 2.0,
    exceptions: tuple = (Exception,)
):
    """
    Декоратор для повторных попыток выполнения асинхронной функции
    
    Args:
        max_attempts: Максимальное количество попыток
        delay: Начальная задержка между попытками в секундах
        backoff_factor: Множитель для увеличения задержки
        exceptions: Кортеж исключений, которые следует перехватывать
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args: Any, **kwargs: Any) -> Any:
            current_delay = delay
            last_exception = None
            
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        await asyncio.sleep(current_delay)
                        current_delay *= backoff_factor
                    else:
                        raise last_exception
            
        return wrapper
    return decorator