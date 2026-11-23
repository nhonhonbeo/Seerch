from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from chat import ask, MODELS

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://seerch-2309a.web.app"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class ChatIn(BaseModel):
    message: str = Field(min_length=1, max_length=200)
    page: str = Field(default="", max_length=20)


@app.get("/health")
def health():
    return {"ok": True, "models": MODELS}


@app.post("/chat")
def chat_endpoint(body: ChatIn):
    return {"reply": ask(body.message, body.page)}