def normalize_text(text: str) -> str:
    return " ".join(text.strip().split())


def calculate_final_score(
    rule_score: int,
    ai_result: dict | None,
) -> int:

    if not ai_result:
        return rule_score

    if "confidence" not in ai_result:
        return rule_score

    try:
        confidence = int(
            ai_result["confidence"]
        )

    except (ValueError, TypeError):
        return rule_score

    ai_risk = str(
        ai_result.get("risk", "")
    ).upper()

    ai_score = 0

    if ai_risk == "HIGH":
        ai_score = max(
            70,
            confidence
        )

    elif ai_risk == "MEDIUM":
        ai_score = max(
            35,
            min(confidence, 69)
        )

    elif ai_risk == "LOW":
        ai_score = min(
            confidence,
            34
        )

    # Combine rule + AI evidence.
    final_score = int(
        (rule_score * 0.55) +
        (ai_score * 0.45)
    )

    return max(
        0,
        min(final_score, 100)
    )