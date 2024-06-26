from django.shortcuts import render, get_object_or_404
from django.contrib.auth import login, logout
from users.models import User
from django.contrib import auth, messages
from users.serializers import UserSerializer, UserLoginSerializer, UserRegistrationSerializer, UpdateUserSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from users.utils import base64_to_image

# Create your views here.
#Регистрация
class RegisterUser(APIView):
    #queryset = User.objects.all()
    #serializer_class = UserRegistrationSerializer
    #permission_classes = (permissions.AllowAny, )
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		data = request.data
		data['image'] = base64_to_image(request.data['image'])
		serializer = UserRegistrationSerializer(data=data)
		if (serializer.is_valid(raise_exception=True)):
			user = serializer.create(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK) 
#Выход
class UserLogout(APIView):
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)
#Вход
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	#authentication_classes = (SessionAuthentication,)
	def post(self, request):
		data = request.data
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)

#Получать информацию о пользователе
class GetUser(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	def get(self, request, username):
		user = get_object_or_404(User, username=username)
		serializer = UserSerializer(user)
		return Response(serializer.data)


class UpdateProfileView(APIView):
  #queryset = User.objects.all()
  permission_classes = (permissions.IsAuthenticated,)
  #serializer_class = UpdateUserSerializer
  def put(self, request, pk):
    data = request.data
    data['image'] = base64_to_image(request.data['image'])
    user = get_object_or_404(User, pk=pk)
    serializer = UpdateUserSerializer(user, data)
    if (serializer.is_valid()):
      serializer.save()
      return Response(status=201)
    return Response(serializer.errors)
			
			
