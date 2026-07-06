"""
Dependency injection for FastAPI route handlers.

Provides reusable dependencies for AI engine, database client,
and authenticated user extraction.
"""

from app.config import settings
from app.services.ai_engine import AIEngine


async def get_ai_engine() -> AIEngine:
    """Provide the AI engine client for route handlers."""
    return AIEngine(
        api_key=settings.openrouter_api_key,
        base_url=settings.openrouter_base_url,
        default_model=settings.openrouter_default_model,
    )
