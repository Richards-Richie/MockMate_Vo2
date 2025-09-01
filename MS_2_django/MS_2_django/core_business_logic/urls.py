from django.urls import path
from core_business_logic.views import interview_view,stt_views,results_view
from core_business_logic.jwt_verifications import jwt_verification


urlpatterns = [
    path("interview/stt/",jwt_verification(stt_views), name="stt_views"),
    path("interview/results/",jwt_verification(results_view), name="results_view"),
    path("interview/<str:topic>/",jwt_verification(interview_view), name="interview_view"),
    
]
