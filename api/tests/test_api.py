from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def payload() -> dict:
    return {
        "publisher": {"id": "habit-harbor", "available_impressions": 3600, "activation_rate": 7.2, "audience_overlap": 100},
        "partner": {"id": "focus-fox", "available_impressions": 2800, "activation_rate": 8.1, "audience_overlap": 72},
        "requested_impressions": 2400,
    }


def test_health():
    assert client.get("/health").json() == {"status": "ok"}


def test_balances_activation_weighted_exchange():
    response = client.post("/plan", json=payload())
    assert response.status_code == 200
    assert response.json() == {
        "send_impressions": 2400,
        "receive_impressions": 2133,
        "expected_activations_sent": 173,
        "expected_activations_received": 173,
        "fairness_percent": 100,
        "fit": "Good",
        "warning": None,
    }


def test_capacity_cap_and_weak_fit_warning():
    data = payload()
    data["partner"].update({"available_impressions": 500, "audience_overlap": 40})
    response = client.post("/plan", json=data)
    assert response.status_code == 200
    assert response.json()["receive_impressions"] == 500
    assert response.json()["fit"] == "Weak"
    assert response.json()["warning"]


def test_rejects_bad_input_and_same_app():
    data = payload()
    data["requested_impressions"] = 0
    assert client.post("/plan", json=data).status_code == 422
    data = payload()
    data["partner"]["id"] = data["publisher"]["id"]
    assert client.post("/plan", json=data).status_code == 422
