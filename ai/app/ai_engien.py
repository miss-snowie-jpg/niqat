import json
import re
from typing import Any

import httpx

from .config import settings


SYSTEM_PROMPT = """
You are NIQAT, an AI cybersecurity assistant focused on
detecting digital-payment scams and social engineering.

Analyze messages for:

- OTP theft
- password theft
- payment fraud
- fake customer support
- impersonation
- phishing
- fake rewards
- fake prizes
- account suspension scams
- malicious links
- investment scams
- job scams
- social engineering
- financial fraud

The system is designed for Ethiopia, so understand references
to TeleBirr, Ethiopian banks, ETB/Birr, mobile money,
Fayda and Ethiopian-style SMS scams.

Return ONLY valid JSON using this structure:

{
  "risk": "LOW|MEDIUM|HIGH",
  "confidence": 0,
  "scam_type": "string",
  "explanation": "string",
  "recommended_action": "ALLOW|VERIFY|BLOCK"
}

Do not invent facts.
If there is insufficient evidence, use MEDIUM or LOW instead
of automatically declaring a scam.
"""


def _extract_json(text: str) -> dict[str, Any] | None:

    text = text.strip()

    try:
        return json.loads(text)

    except json.JSONDecodeError:
        pass

    match = re.search(
        r"\{.*\}",
        text,
        re.DOTALL
    )

    if not match:
        return None

    try:
        return json.loads(match.group(0))
    except json.JSONDecodeError:
        return None


async def analyze_with_ai(
    message: str,
    context: str | None = None,
    language: str | None = None,
) -> dict[str, Any] | None:

    if not settings.ai_enabled:
        return None

    if not settings.hf_api_key:
        return None

    prompt = f"""
{SYSTEM_PROMPT}

Message:
{message}

Context:
{context or "Not provided"}

Language:
{language or "Auto-detect"}
"""

    url = (
        "https://router.huggingface.co/v1/"
        "chat/completions"
    )

    payload = {
        "model": settings.hf_model,
        "messages": [
            {
                "role": "user",
                "content": prompt,
            }
        ],
        "temperature": 0.1,
        "max_tokens": 500,
    }

    headers = {
        "Authorization":
            f"Bearer {settings.hf_api_key}",
        "Content-Type":
            "application/json",
    }

    try:

        async with httpx.AsyncClient(
            timeout=settings.ai_timeout
        ) as client:

            response = await client.post(
                url,
                json=payload,
                headers=headers,
            )

            response.raise_for_status()

            data = response.json()

            content = (
                data["choices"][0]["message"]["content"]
            )

            return _extract_json(content)

    except Exception as error:

        return {
            "error": str(error),
            "available": False,
        }