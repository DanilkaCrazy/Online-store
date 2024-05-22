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
		fields = ('username', 'password', 'first_name', 'image', 'about_self', 'email', 'phone_number', 'birthdate', 'location', 'user_status', 'user_directions')
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

class UpdateUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('username', 'first_name', 'about_self', 'email', 'phone_number', 'birthdate', 'location', 'user_status', 'user_directions')
	
	def validate_email(self, value):
		user = self.context['request'].user
		if User.objects.exclude(pk=user.pk).filter(email=value).exists():
			raise serializers.ValidationError({"email": "This email is already in use."})
		return value

	def validate_username(self, value):
		user = self.context['request'].user
		if User.objects.exclude(pk=user.pk).filter(username=value).exists():
			raise serializers.ValidationError({"username": "This username is already in use."})
		return value
	
	def update(self, instance, validated_data):
		instance.username = validated_data['username']
		instance.first_name = validated_data['first_name']
		instance.about_self = validated_data['about_self']
		instance.email = validated_data['email']
		instance.phone_number = validated_data['phone_number']
		instance.birthdate = validated_data['birthdate']
		instance.location = validated_data['location']
		instance.user_status = validated_data['user_status']
		instance.user_directions = validated_data['user_directions']
		instance.save()
		return instance
