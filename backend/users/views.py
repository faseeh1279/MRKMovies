from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status 
from django.contrib.auth.models import User 
from rest_framework.permissions import IsAuthenticated
from .serializers import (UserSerializer, RegistrationSerializer) 
# from rest_framework.serializers import errors 
from rest_framework.decorators import api_view, permission_classes
# from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

@api_view(['POST'])
def logout_view(request): 
    if request.method == "POST": 
        request.user.auth_token.delete()  
        return Response(status=status.HTTP_200_OK)




@permission_classes([AllowAny])
@api_view(['POST'])
def registration_view(request): # Createing the Token on time of registration. 
    if request.method == "POST": 
        serializer = RegistrationSerializer(data=request.data)
        data = { }

        if serializer.is_valid(): 
            account = serializer.save() 
            print(account)
            data['response'] = "Registration Successful!"
            data['username'] = account.username 
            data['email'] = account.email

            # token = Token.objects.get(user=account).key
            # data['token'] = token 
            refresh = RefreshToken.for_user(account) 
            data['token'] = { 
                'refresh': str(refresh), 
                'access' : str(refresh.access_token)
            }

        else: 
            data = serializer.errors 
        return Response(data, status=status.HTTP_200_OK)



class GetUsersList(APIView): 
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        user = User.objects.all() 
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

