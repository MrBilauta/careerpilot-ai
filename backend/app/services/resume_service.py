"""
Resume analysis service.

Handles PDF text extraction and AI-powered resume analysis including
scoring, ATS compatibility, keyword analysis, and improvement suggestions.
"""

import json

from app.services.ai_engine import AIEngine, AIMessage
from app.models.resume import (
    ResumeAnalysisResponse,
    ResumeScore,
    ATSComparisonResponse,
)

RESUME_ANALYSIS_PROMPT = """You are an expert resume reviewer and career coach specializing in tech industry hiring.

Analyze the following resume and provide a comprehensive review. Return your analysis as JSON with this exact structure:

{
    "overall_score": <0-100>,
    "summary": "<2-3 sentence overall assessment>",
    "scores": [
        {"category": "Content Quality", "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>", "<suggestion2>"]},
        {"category": "ATS Compatibility", "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>"]},
        {"category": "Action Verbs", "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>"]},
        {"category": "Technical Skills", "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>"]},
        {"category": "Formatting & Structure", "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>"]},
        {"category": "Impact & Metrics", "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>"]}
    ],
    "strengths": ["<strength1>", "<strength2>", "<strength3>"],
    "weaknesses": ["<weakness1>", "<weakness2>"],
    "missing_keywords": ["<keyword1>", "<keyword2>"],
    "action_verbs_found": ["<verb1>", "<verb2>"],
    "action_verbs_suggested": ["<verb1>", "<verb2>"],
    "ats_compatible": true/false,
    "grammar_issues": ["<issue1>"],
    "improvement_priority": ["<priority1>", "<priority2>", "<priority3>"]
}

Be specific, actionable, and encouraging. Focus on what would help a CS student land a software engineering internship or job."""

ATS_COMPARISON_PROMPT = """You are an ATS (Applicant Tracking System) expert. Compare the resume against the job description.

Identify matching keywords, missing keywords, and provide an ATS match score.

Return JSON with this exact structure:

{
    "match_score": <0-100>,
    "matched_keywords": ["<keyword1>", "<keyword2>"],
    "missing_keywords": ["<keyword1>", "<keyword2>"],
    "suggestions": ["<suggestion1>", "<suggestion2>"],
    "summary": "<2-3 sentence assessment>",
    "keyword_density": {"<keyword>": <count>}
}

Focus on technical skills, tools, frameworks, and domain-specific terms that ATS systems typically scan for."""


class ResumeService:
    """Service for resume analysis and ATS comparison."""

    def __init__(self, ai_engine: AIEngine) -> None:
        self.ai = ai_engine

    async def analyze_resume(
        self,
        resume_text: str,
        job_title: str | None = None,
    ) -> ResumeAnalysisResponse:
        """
        Analyze a resume using AI and return structured scoring and suggestions.

        Args:
            resume_text: The extracted text content of the resume.
            job_title: Optional target job title for tailored analysis.

        Returns:
            ResumeAnalysisResponse with scores, strengths, weaknesses, and suggestions.
        """
        prompt = f"Resume:\n\n{resume_text}"
        if job_title:
            prompt += f"\n\nTarget Job Title: {job_title}"

        response = await self.ai.analyze(
            prompt=prompt,
            system_prompt=RESUME_ANALYSIS_PROMPT,
            temperature=0.3,
            json_mode=True,
        )

        data = json.loads(response.content)

        return ResumeAnalysisResponse(
            overall_score=data["overall_score"],
            summary=data["summary"],
            scores=[ResumeScore(**s) for s in data["scores"]],
            strengths=data["strengths"],
            weaknesses=data["weaknesses"],
            missing_keywords=data.get("missing_keywords", []),
            action_verbs_found=data.get("action_verbs_found", []),
            action_verbs_suggested=data.get("action_verbs_suggested", []),
            ats_compatible=data.get("ats_compatible", False),
            grammar_issues=data.get("grammar_issues", []),
            improvement_priority=data.get("improvement_priority", []),
        )

    async def compare_ats(
        self,
        resume_text: str,
        job_description: str,
    ) -> ATSComparisonResponse:
        """
        Compare a resume against a job description for ATS compatibility.

        Args:
            resume_text: The extracted text of the resume.
            job_description: The full job description text.

        Returns:
            ATSComparisonResponse with match score and keyword analysis.
        """
        prompt = f"Resume:\n\n{resume_text}\n\n---\n\nJob Description:\n\n{job_description}"

        response = await self.ai.analyze(
            prompt=prompt,
            system_prompt=ATS_COMPARISON_PROMPT,
            temperature=0.2,
            json_mode=True,
        )

        data = json.loads(response.content)

        return ATSComparisonResponse(
            match_score=data["match_score"],
            matched_keywords=data["matched_keywords"],
            missing_keywords=data["missing_keywords"],
            suggestions=data["suggestions"],
            summary=data["summary"],
            keyword_density=data.get("keyword_density", {}),
        )
