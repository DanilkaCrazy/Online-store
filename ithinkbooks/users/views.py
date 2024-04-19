from django.shortcuts import render
from django.contrib.auth import login, logout
from users.models import User
from django.contrib import auth, messages
from users.serializers import UserSerializer, UserLoginSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
# Create your views here.
#Регистрация
class RegisterUser(APIView):
    def post(self, request):
        user = UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            #login(request, user)
        return Response(status=201)
#Выход
class UserLogout(APIView):
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)
#Вход
class UserLogin(APIView):
    def post(self, request):
        data = request.data
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserLogin(APIView):
	#permission_classes = (permissions.AllowAny,)
	#authentication_classes = (SessionAuthentication,)
	def post(self, request):
		data = request.data
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)