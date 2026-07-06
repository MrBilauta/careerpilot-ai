"""Tests for ATS scanner endpoints."""


def test_ats_compare_requires_both_texts(client):
    """ATS compare endpoint should require both resume and job description."""
    response = client.post(
        "/api/v1/ats/compare",
        json={"resume_text": "short", "job_description": "short"},
    )
    assert response.status_code == 422  # Validation error (min_length)
