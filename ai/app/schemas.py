from typing import Any, Optional

from pydantic import BaseModel, Field


class AIRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        max_length=10000
    )

    sender: Optional[str] = None

    context: Optional[str] = None

    language: Optional[str] = None

    transaction_amount: Optional[float] = None

    transaction_currency: Optional[str] = "ETB"


class AIResponse(BaseModel):
    success: bool
    message: str
    received: str


class ScanResponse(BaseModel):
    success: bool

    message: str

    score: int

    risk: str

    action: str

    signals: list[str]

    urls: list[str]

    reasons: list[str]

    recommendation: str

    ai_analysis: Optional[dict[str, Any]] = None