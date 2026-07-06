"""Stub routers for features in development — LinkedIn, Jobs, Roadmap, Projects, Community, Mentor, Analytics, Hackathons, Code Review, Gamification."""

from fastapi import APIRouter

# ── LinkedIn ──────────────────────────────────────────────────────────
linkedin_router = APIRouter(prefix="/linkedin")


@linkedin_router.post("/analyze")
async def analyze_linkedin() -> dict:
    return {
        "status": "coming_soon",
        "feature": "LinkedIn Analyzer",
        "message": "This feature is under development. Contribute at github.com/careerpilot-ai/careerpilot-ai",
    }


# ── Jobs ──────────────────────────────────────────────────────────────
jobs_router = APIRouter(prefix="/jobs")


@jobs_router.get("/search")
async def search_jobs() -> dict:
    return {"status": "coming_soon", "feature": "Job Search"}


@jobs_router.get("/track")
async def get_tracked_jobs() -> dict:
    return {"status": "coming_soon", "feature": "Job Tracker"}


# ── Roadmap ───────────────────────────────────────────────────────────
roadmap_router = APIRouter(prefix="/roadmap")


@roadmap_router.get("/paths")
async def get_roadmap_paths() -> dict:
    return {
        "paths": [
            {
                "id": "frontend",
                "title": "Frontend Development",
                "description": "HTML, CSS, JavaScript, React, Next.js",
            },
            {
                "id": "backend",
                "title": "Backend Development",
                "description": "Node.js, Python, Databases, APIs",
            },
            {
                "id": "ai-ml",
                "title": "AI / Machine Learning",
                "description": "Python, TensorFlow, PyTorch, NLP",
            },
            {
                "id": "cybersecurity",
                "title": "Cybersecurity",
                "description": "Network Security, Cryptography, Ethical Hacking",
            },
            {
                "id": "devops",
                "title": "DevOps",
                "description": "Docker, Kubernetes, CI/CD, Cloud",
            },
            {
                "id": "cloud",
                "title": "Cloud Computing",
                "description": "AWS, GCP, Azure, Serverless",
            },
            {
                "id": "mobile",
                "title": "Mobile Development",
                "description": "React Native, Flutter, Swift, Kotlin",
            },
            {
                "id": "data-science",
                "title": "Data Science",
                "description": "Statistics, Python, SQL, Visualization",
            },
        ]
    }


@roadmap_router.post("/generate")
async def generate_roadmap() -> dict:
    return {"status": "coming_soon", "feature": "AI Roadmap Generator"}


# ── Projects ──────────────────────────────────────────────────────────
projects_router = APIRouter(prefix="/projects")


@projects_router.get("/showcase")
async def get_showcase() -> dict:
    return {"status": "coming_soon", "feature": "Project Showcase"}


@projects_router.post("/generate")
async def generate_projects() -> dict:
    return {"status": "coming_soon", "feature": "AI Project Generator"}


# ── Community ─────────────────────────────────────────────────────────
community_router = APIRouter(prefix="/community")


@community_router.get("/teams")
async def get_teams() -> dict:
    return {"status": "coming_soon", "feature": "Community Teams"}


# ── Mentor ────────────────────────────────────────────────────────────
mentor_router = APIRouter(prefix="/mentor")


@mentor_router.post("/chat")
async def chat_with_mentor() -> dict:
    return {"status": "coming_soon", "feature": "AI Career Mentor"}


# ── Analytics ─────────────────────────────────────────────────────────
analytics_router = APIRouter(prefix="/analytics")


@analytics_router.get("/dashboard")
async def get_analytics() -> dict:
    return {"status": "coming_soon", "feature": "Developer Analytics"}


@analytics_router.get("/portfolio-score")
async def get_portfolio_score() -> dict:
    return {"status": "coming_soon", "feature": "Portfolio Score"}


# ── Hackathons ────────────────────────────────────────────────────────
hackathons_router = APIRouter(prefix="/hackathons")


@hackathons_router.get("/upcoming")
async def get_hackathons() -> dict:
    return {"status": "coming_soon", "feature": "Hackathon Hub"}


# ── Code Review ───────────────────────────────────────────────────────
code_review_router = APIRouter(prefix="/code-review")


@code_review_router.post("/analyze")
async def review_code() -> dict:
    return {"status": "coming_soon", "feature": "AI Code Reviewer"}


# ── Gamification ──────────────────────────────────────────────────────
gamification_router = APIRouter(prefix="/gamification")


@gamification_router.get("/profile")
async def get_gamification_profile() -> dict:
    return {"status": "coming_soon", "feature": "Gamification"}


@gamification_router.get("/leaderboard")
async def get_leaderboard() -> dict:
    return {"status": "coming_soon", "feature": "Leaderboard"}
