from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.views import APIView
from .models import (Movie, Person) 
from reviews.models import (Review, Rating)
from .serializers import (MovieSerializer)
from rest_framework.permissions import IsAuthenticated
from rest_framework import status 


class MovieDetailView(APIView): 
    permission_classes = [IsAuthenticated]

    def get(self, request): 
        # Only fetch movies uploaded by the logged-in user
        movies = Movie.objects.filter(user=request.user)
        serializer = MovieSerializer(movies, many=True, context={'request': request}) 
        return Response(serializer.data)

    def post(self, request): 
        serializer = MovieSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(): 
            serializer.save(user=request.user)  # Ensure user is assigned
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk): 
        try: 
            movie = Movie.objects.get(pk=pk, user=request.user)  # Ensure user can only edit their own movies
        except Movie.DoesNotExist:
            print(f"Movie with ID {pk} not found or does not belong to user {request.user}")  # Debugging
            return Response({"error": "Movie not found or you don't have permission to edit it."}, status=status.HTTP_404_NOT_FOUND)

        serializer = MovieSerializer(movie, data=request.data, partial=True, context={"request": request})
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk): 
        try: 
            movie = Movie.objects.get(pk=pk, user=request.user)  # Restrict delete to owner only
        except Movie.DoesNotExist: 
            return Response({"error": "Movie not found or you don't have permission to delete it."}, status=status.HTTP_404_NOT_FOUND)

        movie.delete() 
        return Response({"message": "Movie deleted successfully"}, status=status.HTTP_200_OK)
    


class MovieListAV(APIView): 
    permission_classes = [IsAuthenticated]
    
    def get(self, request): 
        movies = Movie.objects.all() 
        serializer = MovieSerializer(movies, many=True, context={'request': request})
        return Response(serializer.data)
    
    def post(self, request): 
        serializer = MovieSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)