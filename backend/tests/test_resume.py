"""Tests for resume analysis endpoints."""


def test_resume_analyze_requires_text(client):
    """Resume analyze endpoint should reject empty or short text."""
    response = client.post(
        "/api/v1/resume/analyze",
        json={"resume_text": "too short"},
    )
    assert response.status_code == 422  # Validation error


def test_resume_upload_requires_pdf(client):
    """Resume upload endpoint should reject non-PDF files."""
    response = client.post(
        "/api/v1/resume/upload",
        files={"file": ("resume.txt", b"not a pdf", "text/plain")},
    )
    assert response.status_code == 400
    assert "PDF" in response.json()["detail"]
