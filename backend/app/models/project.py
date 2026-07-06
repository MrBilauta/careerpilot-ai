"""
GitHub and project analysis models.
"""

from pydantic import BaseModel, Field


class GitHubAnalysisRequest(BaseModel):
    """Request to analyze a GitHub profile."""

    username: str = Field(..., min_length=1, max_length=39)


class RepositoryAnalysis(BaseModel):
    """Analysis of a single repository."""

    name: str
    description: str = ""
    language: str = ""
    stars: int = 0
    forks: int = 0
    has_readme: bool = False
    readme_quality: str = ""
    topics: list[str] = Field(default_factory=list)
    last_updated: str = ""
    quality_score: int = Field(0, ge=0, le=100)


class GitHubAnalysisResponse(BaseModel):
    """Complete GitHub profile analysis."""

    username: str
    name: str = ""
    bio: str = ""
    avatar_url: str = ""
    public_repos: int = 0
    followers: int = 0
    following: int = 0
    total_stars: int = 0
    top_languages: dict[str, int] = Field(default_factory=dict)
    contribution_score: int = Field(0, ge=0, le=100)
    profile_score: int = Field(0, ge=0, le=100)
    repositories: list[RepositoryAnalysis] = Field(default_factory=list)
    strengths: list[str] = Field(default_factory=list)
    improvements: list[str] = Field(default_factory=list)
    portfolio_suggestions: list[str] = Field(default_factory=list)
    summary: str = ""


class CoverLetterRequest(BaseModel):
    """Request to generate a cover letter."""

    resume_text: str = Field(..., min_length=50)
    job_description: str = Field(..., min_length=50)
    company_name: str = Field(..., min_length=1)
    job_title: str = Field(..., min_length=1)
    tone: str = Field("professional", pattern="^(professional|friendly|enthusiastic)$")


class CoverLetterResponse(BaseModel):
    """Generated cover letter result."""

    cover_letter: str
    key_points_addressed: list[str]
    tone: str
    word_count: int


class InterviewQuestion(BaseModel):
    """A single interview question with AI-generated answer."""

    question: str
    category: str  # behavioral, technical, system_design
    difficulty: str  # easy, medium, hard
    sample_answer: str
    tips: list[str] = Field(default_factory=list)
    follow_ups: list[str] = Field(default_factory=list)


class InterviewPrepRequest(BaseModel):
    """Request for interview preparation questions."""

    job_title: str = Field(..., min_length=1)
    company: str = ""
    category: str = Field("mixed", pattern="^(behavioral|technical|system_design|mixed)$")
    difficulty: str = Field("medium", pattern="^(easy|medium|hard)$")
    count: int = Field(5, ge=1, le=20)


class InterviewPrepResponse(BaseModel):
    """Interview preparation result."""

    questions: list[InterviewQuestion]
    tips: list[str]
    job_title: str
    company: str = ""
