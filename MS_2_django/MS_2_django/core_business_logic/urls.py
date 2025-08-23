from django.urls import path
from core_business_logic.views import interview_view


urlpatterns = [
    path("interview/<str:topic>/",interview_view, name="interview_view"),
]
