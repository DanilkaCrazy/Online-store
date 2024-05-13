from rest_framework import serializers
from users.models import User
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

UserModel = get_user_model()

class UserSerializer (serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
		

class UserRegistrationSerializer (serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('username', 'password', 'email', 'phone_number', 'birthdate', 'location', 'user_direction', 'user_status', 'user_directions')
	def create(self, validated_data):
		password = validated_data.pop('password')
		user = User(**validated_data)
		user.set_password(password)
		user.save()
		return user

class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['username'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user