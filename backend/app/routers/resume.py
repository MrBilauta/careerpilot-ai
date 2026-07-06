"""
Resume analysis API endpoints.

Provides endpoints for uploading and analyzing resumes using AI.
Supports both PDF upload and raw text analysis.
"""

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile

from app.dependencies import get_ai_engine
from app.models.resume import ResumeAnalysisRequest, ResumeAnalysisResponse
from app.services.ai_engine import AIEngine
from app.services.resume_service import ResumeService
from app.utils.pdf_parser import extract_text_from_pdf

router = APIRouter(prefix="/resume")


@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume(
    request: ResumeAnalysisRequest,
    ai_engine: AIEngine = Depends(get_ai_engine),
) -> ResumeAnalysisResponse:
    """Analyze resume text and return AI-powered scoring and suggestions."""
    service = ResumeService(ai_engine)
    return await service.analyze_resume(
        resume_text=request.resume_text,
        job_title=request.job_title,
    )


@router.post("/upload", response_model=ResumeAnalysisResponse)
async def upload_and_analyze_resume(
    file: UploadFile = File(...),
    job_title: str = Form(None),
    ai_engine: AIEngine = Depends(get_ai_engine),
) -> ResumeAnalysisResponse:
    """Upload a PDF resume, extract text, and analyze with AI."""
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    content = await file.read()
    if len(content) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="File size must be under 10MB")

    resume_text = extract_text_from_pdf(content)
    if len(resume_text.strip()) < 50:
        raise HTTPException(
            status_code=400,
            detail="Could not extract sufficient text from the PDF. Please ensure the PDF contains selectable text.",
        )

    service = ResumeService(ai_engine)
    return await service.analyze_resume(
        resume_text=resume_text,
        job_title=job_title,
    )
