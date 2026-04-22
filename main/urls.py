from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/check_telegram/', views.check_telegram, name='check_telegram'),
    path('api/send_contact/', views.send_application, name='send_application'),
]