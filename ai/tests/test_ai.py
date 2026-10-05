from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root():

    response = client.get("/")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "online"


def test_health():

    response = client.get("/health")

    assert response.status_code == 200

    assert response.json()["status"] == "healthy"


def test_ai_test():

    response = client.post(
        "/api/ai/test",
        json={
            "message": "Hello NIQAT"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True


def test_high_risk_message():

    response = client.post(
        "/api/ai/scan",
        json={
            "message": (
                "URGENT! Your TeleBirr account "
                "will be blocked. Send your OTP "
                "and password immediately."
            ),
            "sender": "+251900000000",
            "context": "SMS",
            "language": "English",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True

    assert data["risk"] == "HIGH"

    assert data["action"] == "BLOCK"

    assert data["score"] >= 70


def test_low_risk_message():

    response = client.post(
        "/api/ai/scan",
        json={
            "message": (
                "Your transfer of 500 ETB "
                "was completed successfully."
            )
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True

    assert data["risk"] in [
        "LOW",
        "MEDIUM",
        "HIGH",
    ]