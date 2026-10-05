import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    app_name: str = os.getenv(
        "APP_NAME",
        "NIQAT AI Processing Center"
    )

    app_version: str = os.getenv(
        "APP_VERSION",
        "1.0.0"
    )

    host: str = os.getenv(
        "HOST",
        "0.0.0.0"
    )

    port: int = int(
        os.getenv("PORT", "8000")
    )

    hf_api_key: str = os.getenv(
        "HF_API_KEY",
        ""
    )

    hf_model: str = os.getenv(
        "HF_MODEL",
        "Qwen/Qwen2.5-7B-Instruct"
    )

    ai_enabled: bool = os.getenv(
        "AI_ENABLED",
        "false"
    ).lower() == "true"

    ai_timeout: int = int(
        os.getenv("AI_TIMEOUT", "30")
    )


settings = Settings()