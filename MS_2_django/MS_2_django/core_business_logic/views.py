from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from core_business_logic.jwt_verifications import jwt_verification
from dotenv import load_dotenv
import os
load_dotenv()
from .interviewQuestions import get_interview_questions
import json
import tempfile
import whisper
from django.conf import settings
from django.core.cache import cache
from .evaluation import get_evaluation_feedback

# Create your views here.

model = whisper.load_model("tiny");

@csrf_exempt
def interview_view(request,topic):
    try:
        res=get_interview_questions(topic)
        if isinstance(res, str):
            res = json.loads(res)
        
        data = res.get("questions", [])
        return JsonResponse({"message": "Interview questions fetched successfully","data":data,"status":200},status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"message": "Error occurred while fetching interview questions","status":500},status=500)

@csrf_exempt
def stt_views(request):
    print("STT view accessed")
    if request.method == 'POST':
        try:
            
            audio_file =request.FILES.get('audio')
            question=request.POST.get('question')
            print("Received question:",question)
            
            if not audio_file:
                return JsonResponse({"message": "No audio file provided","status":400},status=400)
            
            stt_dir=os.path.join(settings.MEDIA_ROOT,'stt_audios')
            os.makedirs(stt_dir,exist_ok=True)
            file_path=os.path.join(stt_dir,audio_file.name)
            with open(file_path, 'wb+') as destination:
                for chunk in audio_file.chunks():
                    destination.write(chunk)
                    
            try:
                
                if not os.path.exists(file_path):
                    return JsonResponse({"message": "File not found","status":404},status=404)
                result = model.transcribe(file_path);
                os.remove(file_path)  
                
                transcription = result.get("text", "")
                cache.set(f"{question}", transcription, timeout=600)  
            except Exception as e:
                print("Error during STT conversion:", e)
                return JsonResponse({"message": "Error occurred while converting speech to text","status":500},status=500)
            
            
        except Exception as e:
            print("hello",e)
            return JsonResponse({"message": "Error occurred while fetching audio file","status":500},status=500)
    return JsonResponse({"message": "STT endpoint working","status":200},status=200)


@csrf_exempt
def results_view(request):
    if request.method == 'GET':
        try:
            keys = cache.keys('*')
            data = {}
            for k in keys:
                data[k] = cache.get(k)
            
            get_evaluation_feedback(data)
            
            return JsonResponse({"message": "Results fetched successfully","data":data,"status":200},status=200)
        except Exception as e:
            print("Error fetching results:", e)
            return JsonResponse({"message": "Error occurred while fetching results","status":500},status=500)