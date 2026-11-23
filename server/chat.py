import os, time
from dotenv import load_dotenv
from google import genai
from google.genai import types, errors

load_dotenv()
client = genai.Client()
MODELS = [m for m in (os.getenv("GEMINI_MODEL"), os.getenv("GEMINI_FALLBACK_MODEL")) if m]
SYSTEM = "Bạn là AI trong game Seerch, trả lời bựa, tối đa 2 câu."


def ask(message: str, page: str = ""):
    cfg = types.GenerateContentConfig(
        system_instruction=SYSTEM, temperature=0.8, max_output_tokens=1000,
    )
    for name in MODELS:
        for attempt in range(2):
            try:
                resp = client.models.generate_content(model=name, contents=message, config=cfg)
                text = (resp.text or "").strip()
                if text:
                    return text
                break                       
            except errors.ServerError:      
                time.sleep(1)
            except errors.ClientError:      
                break
    return None                             