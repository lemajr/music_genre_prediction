from .views import home_page
from django.urls import path


urlpatterns = [
    path('home/', home_page),

]