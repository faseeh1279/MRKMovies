from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status 
from django.contrib.auth.models import User 
from rest_framework.permissions import IsAuthenticated
from .serializers import (UserSerializer, RegistrationSerializer) 
# from rest_framework.serializers import errors 
from rest_framework.decorators import api_view 

@api_view(['POST'])
def registration_view(request): 
    if request.method == "POST": 
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_200_OK)




class UsersListAV(APIView): 
    permission_classes = [IsAuthenticated]

    def get(self, request): 
        user = User.objects.all() 
        if user: 
            serializer = UserSerializer(user, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else: 
            return Response({"error":"Invalid Code..."},status=status.HTTP_204_NO_CONTENT)
