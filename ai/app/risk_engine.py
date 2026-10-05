from .rules import detect_suspicious_url


SIGNAL_WEIGHTS = {
    "otp_request": 30,
    "password_request": 35,
    "money_request": 25,
    "urgency": 15,
    "account_threat": 25,
    "verification_scam": 20,
    "prize_scam": 25,
    "impersonation": 20,
    "link_pressure": 15,
    "gift_scam": 20,
    "job_scam": 20,
}


def calculate_rule_score(
    signals: list[str],
    urls: list[str],
) -> int:

    score = 0

    for signal in signals:
        score += SIGNAL_WEIGHTS.get(
            signal,
            5
        )

    for url in urls:
        if detect_suspicious_url(url):
            score += 20
        else:
            score += 5

    # Multiple different scam indicators
    if len(signals) >= 3:
        score += 15

    if len(signals) >= 5:
        score += 10

    return min(score, 100)


def get_risk_level(score: int) -> str:

    if score >= 70:
        return "HIGH"

    if score >= 35:
        return "MEDIUM"

    return "LOW"


def get_action(risk: str) -> str:

    if risk == "HIGH":
        return "BLOCK"

    if risk == "MEDIUM":
        return "VERIFY"

    return "ALLOW"


def get_recommendation(risk: str) -> str:

    if risk == "HIGH":
        return (
            "Do not send money or share OTPs, passwords, "
            "PINs, or verification codes. Do not open "
            "suspicious links. Verify the sender through "
            "an official channel."
        )

    if risk == "MEDIUM":
        return (
            "Proceed with caution. Verify the sender, "
            "recipient, payment details, and links through "
            "an official channel before continuing."
        )

    return (
        "No strong scam indicators were detected. "
        "Continue to remain cautious with financial "
        "messages and requests."
    )


def generate_reasons(
    signals: list[str],
    urls: list[str],
) -> list[str]:

    reasons = []

    descriptions = {
        "otp_request":
            "The message asks for an OTP or verification code.",

        "password_request":
            "The message requests a password or login credential.",

        "money_request":
            "The message requests money or a financial transfer.",

        "urgency":
            "The message uses urgency or pressure to force quick action.",

        "account_threat":
            "The message threatens account suspension, blocking, or closure.",

        "verification_scam":
            "The message uses account or identity verification as a reason for requesting information.",

        "prize_scam":
            "The message claims the recipient won a prize or reward.",

        "impersonation":
            "The message may be impersonating a financial or customer-support service.",

        "link_pressure":
            "The message pressures the recipient to open or click a link.",

        "gift_scam":
            "The message uses a free gift or reward as an incentive.",

        "job_scam":
            "The message contains possible guaranteed-income or easy-money claims.",
    }

    for signal in signals:
        if signal in descriptions:
            reasons.append(descriptions[signal])

    if urls:
        reasons.append(
            f"The message contains {len(urls)} link(s) that require verification."
        )

    if not reasons:
        reasons.append(
            "No significant scam indicators were detected by the rule engine."
        )

    return reasons