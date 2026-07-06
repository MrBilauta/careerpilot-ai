"""
ATS Scanner API endpoints.
"""

from fastapi import APIRouter, Depends

from app.dependencies import get_ai_engine
from app.models.resume import ATSComparisonRequest, ATSComparisonResponse
from app.services.ai_engine import AIEngine
from app.services.resume_service import ResumeService

router = APIRouter(prefix="/ats")


@router.post("/compare", response_model=ATSComparisonResponse)
async def compare_resume_to_job(
    request: ATSComparisonRequest,
    ai_engine: AIEngine = Depends(get_ai_engine),
) -> ATSComparisonResponse:
    """Compare a resume against a job description for ATS compatibility."""
    service = ResumeService(ai_engine)
    return await service.compare_ats(
        resume_text=request.resume_text,
        job_description=request.job_description,
    )
