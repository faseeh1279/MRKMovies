from rest_framework import serializers 
from django.contrib.auth.models import User 

class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = User 
        fields = ['username', 'email', 'password', 'date_joined', 'first_name', 'last_name']
