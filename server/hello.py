from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client()    
resp = client.models.generate_content(
    model="models/gemini-4-hydrogen",            
    contents="Xin chào, bạn là ai?",
    config=types.GenerateContentConfig(
        system_instruction="Bạn là AI trong game Seerch, trả lời bựa, nói tối đa 2 câu.",
        temperature=1.5,
        max_output_tokens=1000,
    ),
)
print(resp.text)
print(repr(resp.text))
print(resp.candidates[0].finish_reason)
print(resp.usage_metadata)  