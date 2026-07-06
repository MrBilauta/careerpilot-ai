"""
Supabase database connection manager.

Provides an async-compatible Supabase client for database operations.
Falls back gracefully when Supabase is not configured (local dev mode).
"""

from supabase import create_client, Client

from app.config import settings

_supabase_client: Client | None = None


def get_supabase() -> Client | None:
    """
    Get the Supabase client singleton.

    Returns None if Supabase is not configured, allowing the app
    to run in demo mode without a database.
    """
    global _supabase_client

    if not settings.has_supabase:
        return None

    if _supabase_client is None:
        _supabase_client = create_client(
            settings.supabase_url,
            settings.supabase_key,
        )

    return _supabase_client
