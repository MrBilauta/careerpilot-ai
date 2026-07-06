"""
Health check endpoint.

Provides a simple health check and status endpoint for monitoring
and Docker health checks.
"""

from fastapi import APIRouter

from app.config import settings

router = APIRouter()


@router.get("/health")
async def health_check() -> dict:
    """Return application health status and configuration summary."""
    return {
        "status": "healthy",
        "app": settings.app_name,
        "version": "0.1.0",
        "environment": settings.environment,
        "services": {
            "ai": settings.has_ai_key,
            "github": settings.has_github_token,
            "database": settings.has_supabase,
        },
    }
