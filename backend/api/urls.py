from django.urls import path
from .views import MusicRecommendationView

urlpatterns = [
    path('predict/', MusicRecommendationView.as_view(), name='predict_genre'),
]
