"""
Rate limiting middleware using SlowAPI.

Protects API endpoints from abuse with configurable rate limits
per IP address. Limits are set via the RATE_LIMIT environment variable.
"""

from fastapi import FastAPI
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.config import settings

# Create the limiter instance
limiter = Limiter(key_func=get_remote_address, default_limits=[settings.rate_limit])


def add_rate_limiting(app: FastAPI) -> None:
    """Add rate limiting middleware to the FastAPI application."""
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
