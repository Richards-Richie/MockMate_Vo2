from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from core_business_logic.jwt_verifications import jwt_verification


# Create your views here.

@csrf_exempt
@jwt_verification
def interview_view(request,topic):
    
    
    return  JsonResponse({"message": "Welcome to the interview page!","status":200},status=200)