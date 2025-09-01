import whisper
import os 
from django.http import JsonResponse

model = whisper.load_model("tiny");
def convert_speech_to_text(audio_file_path):
    if not os.path.exists(audio_file_path):
        raise FileNotFoundError( "File not found")
    res = model.transcribe(audio_file_path);
    return res["text"]