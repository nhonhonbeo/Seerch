import os, time
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from google import genai
from google.genai import types, errors

load_dotenv()
client = genai.Client()
MODELS = [m for m in (os.getenv("GEMINI_MODEL"), os.getenv("GEMINI_FALLBACK_MODEL")) if m]
SYSTEM = "Bạn là AI trong game Seerch, trả lời bựa, tối đa 2 câu."

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://seerch-2309a.web.app"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
class ChatIn(BaseModel):
    message: str = Field(min_length=1, max_length=200)   # Pydantic tự từ chối đầu vào quá dài
    page: str = Field(default="", max_length=20)

def generate(message: str):
    cfg = types.GenerateContentConfig(
        system_instruction=SYSTEM, temperature=0.8, max_output_tokens=1000,
    )
    for name in MODELS:
        for attempt in range(3):
            try:
                resp = client.models.generate_content(model=name, contents=message, config=cfg)
                text = (resp.text or "").strip()
                if text:
                    return text
                break
            except errors.Server.Erroor:
                time.sleep(2**attempt)
            except errors.ClientError:
                break
        return None
    
@app.get("/health")
def health():
    return {"ok": True, "models": MODELS}

@app.post("/chat")
def chat(body: ChatIn):
    resp = client.models.generate_content(
        model="TÊN_MODEL",
        contents=body.message,
        config=types.GenerateContentConfig(
            system_instruction="Bạn là AI trong game Seerch, nói bựa, tối đa 2 câu.",
            max_output_tokens=300,
        ),
    )
    return {"reply": resp.text}