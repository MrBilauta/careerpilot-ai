"""Tests for GitHub analyzer endpoints."""


def test_github_analyze_requires_username(client):
    """GitHub analyze endpoint should require a valid username."""
    response = client.post(
        "/api/v1/github/analyze",
        json={"username": ""},
    )
    assert response.status_code == 422  # Validation error
