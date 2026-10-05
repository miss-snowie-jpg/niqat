from fastapi import FastAPI

from .config import settings
from .schemas import (
    AIRequest,
    AIResponse,
    ScanResponse,
)
from .rules import (
    detect_scam_signals,
    detect_urls,
    detect_phone_numbers,
    detect_ethiopian_keywords,
)
from .risk_engine import (
    calculate_rule_score,
    get_risk_level,
    get_action,
    get_recommendation,
    generate_reasons,
)
from .ai_engine import analyze_with_ai
from .utils import (
    normalize_text,
    calculate_final_score,
)


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description=(
        "NIQAT AI processing center for detecting "
        "digital-payment scams and social engineering."
    ),
)


@app.get("/")
def root():

    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "status": "online",
        "message": (
            "NIQAT AI processing center is running"
        ),
    }


@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "niqat-ai",
        "version": settings.app_version,
        "ai_enabled": settings.ai_enabled,
    }


@app.post(
    "/api/ai/test",
    response_model=AIResponse,
)
def test_ai(request: AIRequest):

    return AIResponse(
        success=True,
        message=(
            "NIQAT AI received the request successfully."
        ),
        received=request.message,
    )


@app.post(
    "/api/ai/scan",
    response_model=ScanResponse,
)
async def scan_message(
    request: AIRequest,
):

    message = normalize_text(
        request.message
    )

    signals = detect_scam_signals(
        message
    )

    urls = detect_urls(
        message
    )

    phone_numbers = detect_phone_numbers(
        message
    )

    ethiopian_keywords = detect_ethiopian_keywords(
        message
    )

    rule_score = calculate_rule_score(
        signals,
        urls,
    )

    ai_result = await analyze_with_ai(
        message=message,
        context=request.context,
        language=request.language,
    )

    final_score = calculate_final_score(
        rule_score,
        ai_result,
    )

    risk = get_risk_level(
        final_score
    )

    action = get_action(
        risk
    )

    recommendation = get_recommendation(
        risk
    )

    reasons = generate_reasons(
        signals,
        urls,
    )

    if ai_result:

        ai_explanation = ai_result.get(
            "explanation"
        )

        if ai_explanation:
            reasons.append(
                f"AI analysis: {ai_explanation}"
            )

    return ScanResponse(
        success=True,
        message=message,
        score=final_score,
        risk=risk,
        action=action,
        signals=signals,
        urls=urls,
        reasons=reasons,
        recommendation=recommendation,
        ai_analysis={
            "enabled": settings.ai_enabled,
            "result": ai_result,
        },
    )