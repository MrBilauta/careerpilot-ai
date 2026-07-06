"""Tests for the health check endpoint."""


def test_health_check(client):
    """Health endpoint should return 200 with status healthy."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["app"] == "CareerPilot AI"
    assert "services" in data


def test_health_check_services(client):
    """Health endpoint should report service availability."""
    response = client.get("/api/v1/health")
    data = response.json()
    services = data["services"]
    assert "ai" in services
    assert "github" in services
    assert "database" in services
