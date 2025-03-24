from rest_framework import serializers 
from django.contrib.auth.models import User 
from .models import (PostMessage)

class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = User 
        fields = ['username', 'email', 'password', 'date_joined', 'first_name', 'last_name']


class RegistrationSerializer(serializers.ModelSerializer): 
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta: 
        model = User 
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = { 
            'password' : {'write_only': True}
        }
    
    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'error': 'Passwords must match.'})

        if User.objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError({"error": "Email already exists!"})

        account = User.objects.create_user(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            password=password
        )
        return account

class PostMessageSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = PostMessage
        fields = ['user', 'message', 'email']
        