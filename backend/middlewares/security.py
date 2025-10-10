"""
Security headers middleware
"""
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.csp_policy = {
            'default-src': "'self'",
            'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
            'style-src': "'self' 'unsafe-inline'",
            'img-src': "'self' data: https:",
            'font-src': "'self' data:",
            'connect-src': "'self'"
        }

    async def dispatch(self, request, call_next):
        response = await call_next(request)
        
        if not isinstance(response, Response):
            return response
            
        # CSP настройки
        csp_header = '; '.join([f"{key} {value}" for key, value in self.csp_policy.items()])
        response.headers['Content-Security-Policy'] = csp_header
        
        # Другие заголовки безопасности
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        
        return response