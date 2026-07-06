"""
Application configuration using Pydantic Settings.

All configuration is loaded from environment variables with sensible defaults
for local development. In production, configure via .env or environment variables.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # ── Application ───────────────────────────────────────────────────
    environment: str = "development"
    app_name: str = "CareerPilot AI"
    debug: bool = True

    # ── OpenRouter AI ─────────────────────────────────────────────────
    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_default_model: str = "google/gemini-2.0-flash-001"

    # ── Supabase ──────────────────────────────────────────────────────
    supabase_url: str = ""
    supabase_key: str = ""

    # ── GitHub ────────────────────────────────────────────────────────
    github_token: str = ""

    # ── Clerk ─────────────────────────────────────────────────────────
    clerk_secret_key: str = ""

    # ── CORS ──────────────────────────────────────────────────────────
    cors_origins: str = "http://localhost:3000"

    # ── Rate Limiting ─────────────────────────────────────────────────
    rate_limit: str = "60/minute"

    @property
    def cors_origins_list(self) -> list[str]:
        """Parse comma-separated CORS origins into a list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]

    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.environment == "production"

    @property
    def has_ai_key(self) -> bool:
        """Check if OpenRouter API key is configured."""
        return bool(self.openrouter_api_key)

    @property
    def has_github_token(self) -> bool:
        """Check if GitHub token is configured."""
        return bool(self.github_token)

    @property
    def has_supabase(self) -> bool:
        """Check if Supabase is configured."""
        return bool(self.supabase_url and self.supabase_key)


# Global settings instance
settings = Settings()
