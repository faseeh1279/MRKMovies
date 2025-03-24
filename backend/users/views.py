from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status 
from django.contrib.auth.models import User 
from rest_framework.permissions import IsAuthenticated
from .serializers import (UserSerializer, RegistrationSerializer) 
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.views import APIView

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request): 
    try: 
        refresh_token = request.data.get("refresh_token")
        if not refresh_token: 
            return Response({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
        token = RefreshToken(refresh_token)
        token.blacklist() # Blacklist refresh token
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    except Exception as e: 
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def registration_view(request):
    if request.method == "POST": 
        serializer = RegistrationSerializer(data=request.data)
        data = { }

        if serializer.is_valid(): 
            account = serializer.save() 
            print(account)
            data['response'] = "Registration Successful!"
            data['username'] = account.username 
            data['email'] = account.email

        else: 
            data = serializer.errors 
       
        
        return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
def login_view(request): 
    if request.method == "POST": 
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password: 
            return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username = username, password = password)

        if user is not None: 
            refresh = RefreshToken.for_user(user) 
            return Response({ 
                "access_token": str(refresh.access_token), 
                "refresh_token": str(refresh), 
                "user": { 
                    "id": user.id, 
                    "username": user.username, 
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)
        else: 
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)



class UserInterface(APIView): 
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        user = request.user
        serializer = UserSerializer(user) 
        return Response(serializer.data, status=status.HTTP_200_OK)

    
        
