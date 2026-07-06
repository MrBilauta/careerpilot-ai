"""
Cover Letter Generator API endpoints.
"""

from fastapi import APIRouter, Depends

from app.dependencies import get_ai_engine
from app.services.ai_engine import AIEngine
from app.services.cover_letter_service import CoverLetterService
from app.models.project import CoverLetterRequest, CoverLetterResponse

router = APIRouter(prefix="/cover-letter")


@router.post("/generate", response_model=CoverLetterResponse)
async def generate_cover_letter(
    request: CoverLetterRequest,
    ai_engine: AIEngine = Depends(get_ai_engine),
) -> CoverLetterResponse:
    """Generate a personalized cover letter based on resume and job description."""
    service = CoverLetterService(ai_engine)
    return await service.generate(
        resume_text=request.resume_text,
        job_description=request.job_description,
        company_name=request.company_name,
        job_title=request.job_title,
        tone=request.tone,
    )
