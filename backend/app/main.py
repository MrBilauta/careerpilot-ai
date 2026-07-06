"""
CareerPilot AI — FastAPI Application Factory

This module creates and configures the FastAPI application with all
middleware, routers, and event handlers. The factory pattern enables
easy testing and configuration swapping.
"""

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.middleware.rate_limit import add_rate_limiting
from app.routers import (
    analytics,
    ats,
    code_review,
    community,
    cover_letter,
    gamification,
    github_analyzer,
    hackathons,
    health,
    interview,
    jobs,
    linkedin,
    mentor,
    projects,
    resume,
    roadmap,
)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """Application lifespan manager for startup and shutdown events."""
    # Startup
    print(f"CareerPilot AI Backend starting in {settings.environment} mode")
    yield
    # Shutdown
    print("CareerPilot AI Backend shutting down")


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="CareerPilot AI",
        description="The AI Career Copilot for Computer Science Students",
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # ── CORS ──────────────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Rate Limiting ─────────────────────────────────────────────────
    add_rate_limiting(app)

    # ── Routers ───────────────────────────────────────────────────────
    api_prefix = "/api/v1"

    app.include_router(health.router, prefix=api_prefix, tags=["Health"])
    app.include_router(resume.router, prefix=api_prefix, tags=["Resume"])
    app.include_router(ats.router, prefix=api_prefix, tags=["ATS Scanner"])
    app.include_router(
        github_analyzer.router, prefix=api_prefix, tags=["GitHub Analyzer"]
    )
    app.include_router(linkedin.router, prefix=api_prefix, tags=["LinkedIn Analyzer"])
    app.include_router(cover_letter.router, prefix=api_prefix, tags=["Cover Letter"])
    app.include_router(interview.router, prefix=api_prefix, tags=["Interview"])
    app.include_router(jobs.router, prefix=api_prefix, tags=["Jobs"])
    app.include_router(roadmap.router, prefix=api_prefix, tags=["Roadmap"])
    app.include_router(projects.router, prefix=api_prefix, tags=["Projects"])
    app.include_router(community.router, prefix=api_prefix, tags=["Community"])
    app.include_router(mentor.router, prefix=api_prefix, tags=["Mentor"])
    app.include_router(analytics.router, prefix=api_prefix, tags=["Analytics"])
    app.include_router(hackathons.router, prefix=api_prefix, tags=["Hackathons"])
    app.include_router(code_review.router, prefix=api_prefix, tags=["Code Review"])
    app.include_router(gamification.router, prefix=api_prefix, tags=["Gamification"])

    return app


# Create the application instance
app = create_app()
