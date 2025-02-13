from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status 
from django.contrib.auth.models import User 
from . import serializers 
# from rest_framework.serializers import errors 

class UsersListAV(APIView): 
    queryset = User.objects.all() 
    # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    def get(self, request): 
        user = User.objects.all() 
        if user: 
            serializer = serializers.UserSerializer(user, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else: 
            return Response(serializer.errors,status=status.HTTP_204_NO_CONTENT)
