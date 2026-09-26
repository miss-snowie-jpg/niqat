from fastapi import FastAPI

app = FastAPI(
    title="NIQAT AI",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "ai responsive."
    }
