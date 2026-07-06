"""
Interview preparation service.
"""

import json

from app.models.project import InterviewPrepResponse, InterviewQuestion
from app.services.ai_engine import AIEngine

INTERVIEW_PROMPT = """You are a senior tech interviewer who helps candidates prepare for software engineering interviews.

Generate interview questions with detailed sample answers based on the role and difficulty.

Return JSON with this exact structure:

{
    "questions": [
        {
            "question": "<the interview question>",
            "category": "<behavioral|technical|system_design>",
            "difficulty": "<easy|medium|hard>",
            "sample_answer": "<detailed sample answer using STAR method for behavioral, step-by-step for technical>",
            "tips": ["<tip1>", "<tip2>"],
            "follow_ups": ["<follow-up question 1>", "<follow-up question 2>"]
        }
    ],
    "tips": ["<general interview tip 1>", "<general tip 2>", "<general tip 3>"],
    "job_title": "<the job title>",
    "company": "<company if specified>"
}

For behavioral questions, use the STAR method in sample answers.
For technical questions, include code snippets where relevant.
For system design, outline the high-level architecture approach."""


class InterviewService:
    """Service for generating interview preparation materials."""

    def __init__(self, ai_engine: AIEngine) -> None:
        self.ai = ai_engine

    async def generate_questions(
        self,
        job_title: str,
        company: str = "",
        category: str = "mixed",
        difficulty: str = "medium",
        count: int = 5,
    ) -> InterviewPrepResponse:
        """Generate interview preparation questions with sample answers."""
        prompt = (
            f"Job Title: {job_title}\n"
            f"Company: {company or 'General'}\n"
            f"Category: {category}\n"
            f"Difficulty: {difficulty}\n"
            f"Number of questions: {count}"
        )

        response = await self.ai.analyze(
            prompt=prompt,
            system_prompt=INTERVIEW_PROMPT,
            temperature=0.7,
            json_mode=True,
        )

        data = json.loads(response.content)
        return InterviewPrepResponse(
            questions=[InterviewQuestion(**q) for q in data["questions"]],
            tips=data.get("tips", []),
            job_title=data.get("job_title", job_title),
            company=data.get("company", company),
        )
