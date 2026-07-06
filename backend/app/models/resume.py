"""
Resume models — Pydantic schemas for resume analysis.
"""

from pydantic import BaseModel, Field


class ResumeAnalysisRequest(BaseModel):
    """Request to analyze resume text."""

    resume_text: str = Field(..., min_length=50, description="Extracted resume text content")
    job_title: str | None = Field(None, description="Target job title for tailored analysis")
    job_description: str | None = Field(None, description="Job description for ATS comparison")


class ResumeScore(BaseModel):
    """Individual scoring category."""

    category: str
    score: int = Field(..., ge=0, le=100)
    feedback: str
    suggestions: list[str] = Field(default_factory=list)


class ResumeAnalysisResponse(BaseModel):
    """Complete resume analysis result."""

    overall_score: int = Field(..., ge=0, le=100)
    summary: str
    scores: list[ResumeScore]
    strengths: list[str]
    weaknesses: list[str]
    missing_keywords: list[str] = Field(default_factory=list)
    action_verbs_found: list[str] = Field(default_factory=list)
    action_verbs_suggested: list[str] = Field(default_factory=list)
    ats_compatible: bool
    grammar_issues: list[str] = Field(default_factory=list)
    improvement_priority: list[str] = Field(default_factory=list)


class ATSComparisonRequest(BaseModel):
    """Request to compare resume against a job description."""

    resume_text: str = Field(..., min_length=50)
    job_description: str = Field(..., min_length=50)


class ATSComparisonResponse(BaseModel):
    """ATS comparison result."""

    match_score: int = Field(..., ge=0, le=100)
    matched_keywords: list[str]
    missing_keywords: list[str]
    suggestions: list[str]
    summary: str
    keyword_density: dict[str, int] = Field(default_factory=dict)
