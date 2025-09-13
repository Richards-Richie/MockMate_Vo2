from google import genai 
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv

import os,json
load_dotenv()
class EvaluationItem(BaseModel):
    relevanceScore: float
    technicalAccuracyScore: float
    improvement : str
    OverallFeedback: str
    
class EvaluationResponse(BaseModel):
    evaluations: List[EvaluationItem]
    
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def get_evaluation_feedback(data) :
    print(data)
    qa_list = [{"question":q,"answer":a} for q,a in data.items()]
    qa_json = json.dumps(qa_list, indent=2)
    base_prompt= os.getenv("EVALUATION_PROMPT")
    final_prompt =f"{base_prompt} \t {qa_json}"
    response = client.models.generate_content(
        model = "gemini-2.0-flash-lite",
        contents = final_prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": EvaluationResponse,
        }
    )
    print(response.text)