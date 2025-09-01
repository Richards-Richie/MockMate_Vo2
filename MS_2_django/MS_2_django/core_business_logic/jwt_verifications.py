from django.http import JsonResponse
from functools import wraps
from django.conf import settings
import jwt
from dotenv import load_dotenv
import os 

load_dotenv()

def jwt_verification(view_func):
    @wraps(view_func)
    def wrapper(request,*args,**kwargs):
        
        accessToken = request.COOKIES.get("accessToken")
        if not accessToken:
            print("No access token provided")
            return JsonResponse({"message":"Unauthorized idk why","status":401}, status=401)
        
        try:
            payload = jwt.decode(
                accessToken,
                os.getenv("JWTSECRET"),
                algorithms=[os.getenv("JWTALGORITHM")], 
            )
            request.user = payload
            
        except Exception as e:
            print("JWT decode error:", str(e))
            return JsonResponse({"message": str(e), "status":401}, status=401)

        return view_func(request,*args,**kwargs)
    
    return wrapper