"""
Job and internship models.
"""

from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class JobStatus(str, Enum):
    """Job application tracking status."""

    WISHLIST = "wishlist"
    APPLIED = "applied"
    INTERVIEW = "interview"
    OFFER = "offer"
    REJECTED = "rejected"


class Job(BaseModel):
    """A tracked job application."""

    id: str | None = None
    title: str
    company: str
    location: str = ""
    url: str = ""
    status: JobStatus = JobStatus.WISHLIST
    salary_range: str = ""
    notes: str = ""
    applied_date: datetime | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None


class JobSearchRequest(BaseModel):
    """Request to search for jobs/internships."""

    query: str = Field(..., min_length=2)
    location: str = ""
    remote: bool = False
    internship: bool = False
    page: int = Field(1, ge=1)
    limit: int = Field(20, ge=1, le=100)


class JobSearchResult(BaseModel):
    """A single job search result."""

    title: str
    company: str
    location: str
    url: str
    description: str = ""
    salary_range: str = ""
    posted_date: str = ""
    is_remote: bool = False
    is_internship: bool = False


class JobSearchResponse(BaseModel):
    """Paginated job search results."""

    results: list[JobSearchResult]
    total: int
    page: int
    limit: int
