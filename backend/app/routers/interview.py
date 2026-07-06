"""
Interview Preparation API endpoints.
"""

from fastapi import APIRouter, Depends

from app.dependencies import get_ai_engine
from app.models.project import InterviewPrepRequest, InterviewPrepResponse
from app.services.ai_engine import AIEngine
from app.services.interview_service import InterviewService

router = APIRouter(prefix="/interview")


@router.post("/prepare", response_model=InterviewPrepResponse)
async def generate_interview_questions(
    request: InterviewPrepRequest,
    ai_engine: AIEngine = Depends(get_ai_engine),
) -> InterviewPrepResponse:
    """Generate interview questions with sample answers for preparation."""
    service = InterviewService(ai_engine)
    return await service.generate_questions(
        job_title=request.job_title,
        company=request.company,
        category=request.category,
        difficulty=request.difficulty,
        count=request.count,
    )
