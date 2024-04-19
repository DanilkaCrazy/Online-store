from django.shortcuts import render
from users.models import User
from django.contrib import auth, messages
from users.serializers import UserSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.
#Создание отзыва
class RegisterUser(APIView):
    def post(self, request):
        user = UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
        return Response(status=201) 