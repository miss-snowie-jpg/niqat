import re


SCAM_PATTERNS = {
    "otp_request": [
        r"\botp\b",
        r"one[- ]time password",
        r"verification code",
        r"verification pin",
        r"security code",
        r"send.*code",
        r"share.*code",
        r"tell.*code",
    ],

    "password_request": [
        r"send.*password",
        r"share.*password",
        r"give.*password",
        r"account password",
        r"login password",
    ],

    "money_request": [
        r"send.*money",
        r"send.*cash",
        r"transfer.*money",
        r"transfer.*birr",
        r"pay.*fee",
        r"payment.*required",
        r"deposit.*money",
        r"send.*payment",
    ],

    "urgency": [
        r"\burgent\b",
        r"\bimmediately\b",
        r"\basap\b",
        r"act now",
        r"right now",
        r"within.*minutes",
        r"limited time",
        r"last chance",
    ],

    "account_threat": [
        r"account.*blocked",
        r"account.*suspended",
        r"account.*closed",
        r"account.*deactivated",
        r"account.*locked",
        r"will be blocked",
        r"will be suspended",
    ],

    "verification_scam": [
        r"verify.*account",
        r"confirm.*account",
        r"verify.*identity",
        r"confirm.*identity",
        r"verification.*required",
        r"security.*verification",
    ],

    "prize_scam": [
        r"you.*won",
        r"you.*winner",
        r"congratulations.*won",
        r"claim.*prize",
        r"claim.*reward",
        r"free.*money",
        r"cash.*prize",
        r"reward.*waiting",
    ],

    "impersonation": [
        r"telebirr.*support",
        r"telebirr.*customer service",
        r"telebirr.*agent",
        r"bank.*support",
        r"bank.*agent",
        r"customer.*service.*agent",
        r"official.*agent",
    ],

    "link_pressure": [
        r"click.*link",
        r"click.*below",
        r"open.*link",
        r"visit.*link",
        r"login.*link",
        r"verify.*link",
    ],

    "gift_scam": [
        r"free gift",
        r"gift.*waiting",
        r"claim.*gift",
        r"special.*gift",
    ],

    "job_scam": [
        r"easy money",
        r"work from home.*money",
        r"guaranteed income",
        r"guaranteed.*profit",
        r"investment.*profit",
    ],
}


URL_PATTERN = re.compile(
    r"https?://[^\s]+|"
    r"www\.[^\s]+|"
    r"\b[a-zA-Z0-9-]+\.(?:com|net|org|info|xyz|site|online|top|click|shop|link)"
)


def detect_scam_signals(message: str) -> list[str]:
    text = message.lower()

    detected = []

    for signal_name, patterns in SCAM_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, text):
                detected.append(signal_name)
                break

    return detected


def detect_urls(message: str) -> list[str]:
    matches = URL_PATTERN.findall(message)

    cleaned = []

    for url in matches:
        url = url.rstrip(".,!?;:)")

        if url not in cleaned:
            cleaned.append(url)

    return cleaned


def detect_suspicious_url(url: str) -> bool:
    suspicious_extensions = [
        ".xyz",
        ".top",
        ".click",
        ".info",
        ".online",
        ".site",
        ".link",
    ]

    lowered = url.lower()

    return any(
        extension in lowered
        for extension in suspicious_extensions
    )


def detect_phone_numbers(message: str) -> list[str]:
    pattern = r"(?:\+251|251|0)?9\d{8}"

    return re.findall(pattern, message)


def detect_ethiopian_keywords(message: str) -> list[str]:
    keywords = [
        "telebirr",
        "ethiotelecom",
        "etbirr",
        "birr",
        "cbe",
        "awash",
        "dashen",
        "boa",
        "bank",
        "fayda",
        "otp",
    ]

    text = message.lower()

    return [
        keyword
        for keyword in keywords
        if keyword in text
    ]