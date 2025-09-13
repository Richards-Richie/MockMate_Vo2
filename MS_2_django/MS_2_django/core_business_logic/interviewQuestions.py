from google import genai
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv

import os
load_dotenv()
class Question(BaseModel):
    id:int
    difficulty:str
    question:str

class Interview(BaseModel):
    id:int
    questions:List[Question]
    
    
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def get_interview_questions(topic:str):
    topic=topic.upper()
    content=os.getenv(topic)
    print(content)
    response=client.models.generate_content(
        model="gemini-2.0-flash-lite",
        contents=content,
        config={
            "response_mime_type": "application/json",
            "response_schema": Interview,
        },
    )
    res=response.parsed.model_dump_json(indent=2)
    return res 