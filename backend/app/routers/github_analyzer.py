"""
GitHub Analyzer API endpoints.
"""

from fastapi import APIRouter, HTTPException

from app.services.github_service import GitHubService
from app.models.project import GitHubAnalysisRequest, GitHubAnalysisResponse

router = APIRouter(prefix="/github")


@router.post("/analyze", response_model=GitHubAnalysisResponse)
async def analyze_github_profile(
    request: GitHubAnalysisRequest,
) -> GitHubAnalysisResponse:
    """Analyze a GitHub profile including repositories, languages, and contributions."""
    service = GitHubService()
    try:
        result = await service.analyze_profile(request.username)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=404 if "404" in str(e) else 500,
            detail=f"Failed to analyze GitHub profile: {e}",
        )
    finally:
        await service.close()
