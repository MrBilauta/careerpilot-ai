"""
Cover letter generation service.
"""

import json

from app.models.project import CoverLetterResponse
from app.services.ai_engine import AIEngine

COVER_LETTER_PROMPT = """You are an expert cover letter writer for tech industry jobs.

Generate a compelling, personalized cover letter based on the candidate's resume and the target job.

Return JSON with this exact structure:

{
    "cover_letter": "<the complete cover letter text, properly formatted with paragraphs>",
    "key_points_addressed": ["<point1>", "<point2>", "<point3>"],
    "tone": "<the tone used>",
    "word_count": <number>
}

Guidelines:
- Keep it to 3-4 paragraphs (250-400 words)
- Address specific requirements from the job description
- Highlight relevant experience from the resume
- Show enthusiasm for the company and role
- Use the requested tone
- Include specific technical skills that match
- End with a clear call to action"""


class CoverLetterService:
    """Service for generating personalized cover letters."""

    def __init__(self, ai_engine: AIEngine) -> None:
        self.ai = ai_engine

    async def generate(
        self,
        resume_text: str,
        job_description: str,
        company_name: str,
        job_title: str,
        tone: str = "professional",
    ) -> CoverLetterResponse:
        """Generate a personalized cover letter."""
        prompt = (
            f"Resume:\n{resume_text}\n\n"
            f"Job Description:\n{job_description}\n\n"
            f"Company: {company_name}\n"
            f"Position: {job_title}\n"
            f"Tone: {tone}"
        )

        response = await self.ai.analyze(
            prompt=prompt,
            system_prompt=COVER_LETTER_PROMPT,
            temperature=0.7,
            json_mode=True,
        )

        data = json.loads(response.content)
        return CoverLetterResponse(**data)
