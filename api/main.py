from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field, model_validator

app = FastAPI(title="LiftLoop planning API", version="0.1.0")


class AppProfile(BaseModel):
    id: str = Field(min_length=2, max_length=60, pattern=r"^[a-z0-9-]+$")
    available_impressions: int = Field(ge=100, le=10_000_000)
    activation_rate: float = Field(ge=0.1, le=50)
    audience_overlap: int = Field(ge=0, le=100)


class PlanRequest(BaseModel):
    publisher: AppProfile
    partner: AppProfile
    requested_impressions: int = Field(ge=100, le=10_000_000)

    @model_validator(mode="after")
    def apps_must_differ(self):
        if self.publisher.id == self.partner.id:
            raise ValueError("publisher and partner must be different apps")
        return self


class PlanResponse(BaseModel):
    send_impressions: int
    receive_impressions: int
    expected_activations_sent: int
    expected_activations_received: int
    fairness_percent: int
    fit: Literal["Excellent", "Good", "Weak"]
    warning: str | None


def allocate(payload: PlanRequest) -> PlanResponse:
    send = min(payload.requested_impressions, payload.publisher.available_impressions)
    sent_value = send * payload.publisher.activation_rate / 100
    receive = min(
        payload.partner.available_impressions,
        round(sent_value / (payload.partner.activation_rate / 100)),
    )
    received_value = receive * payload.partner.activation_rate / 100
    fairness = round(min(sent_value, received_value) / max(sent_value, received_value) * 100)
    overlap = payload.partner.audience_overlap
    fit: Literal["Excellent", "Good", "Weak"] = "Excellent" if overlap >= 75 else "Good" if overlap >= 55 else "Weak"
    return PlanResponse(
        send_impressions=send,
        receive_impressions=receive,
        expected_activations_sent=round(sent_value),
        expected_activations_received=round(received_value),
        fairness_percent=fairness,
        fit=fit,
        warning="Audience overlap is below the 55% test threshold." if overlap < 55 else None,
    )


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/plan", response_model=PlanResponse)
def plan(payload: PlanRequest) -> PlanResponse:
    return allocate(payload)
