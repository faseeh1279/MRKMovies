from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import (Review, Rating)
from .serializers import AddReviewSerializer
from movies.models import (Movie)

# ✅ View for listing all reviews and adding new reviews
class AddReviewAV(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reviews = Review.objects.all()
        serializer = AddReviewSerializer(reviews, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        rating_value = request.data.get('rating')
        
        if rating_value is not None and (not isinstance(rating_value, int) or rating_value not in range(1, 6)):
            return Response({"error": "Rating must be an integer between 1 and 5."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AddReviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            review = serializer.save(user=request.user)  # ✅ Link review to user
            
            if rating_value is not None:
                Rating.objects.create(user=request.user, movie=review.movie, rating=rating_value)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# ✅ View for handling a single review (Retrieve, Update, Delete)
class SingleReviewAV(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        review = get_object_or_404(Review, id=pk, user=request.user)
        rating = Rating.objects.filter(user=review.user, movie=review.movie).first()  # Fetch rating
        review_data = AddReviewSerializer(review, context={'request': request}).data
        review_data['rating'] = rating.rating if rating else None  # Add rating to response

        return Response(review_data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        review = get_object_or_404(Review, id=pk, user=request.user)
        serializer = AddReviewSerializer(review, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            serializer.save()

            # Update rating if provided
            rating_value = request.data.get('rating')
            if rating_value is not None:
                rating_obj, created = Rating.objects.get_or_create(user=request.user, movie=review.movie)
                rating_obj.rating = rating_value
                rating_obj.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        review = get_object_or_404(Review, id=pk, user=request.user)
        review.delete()

        # ✅ Delete associated rating
        Rating.objects.filter(user=request.user, movie=review.movie).delete()

        return Response({"message": "Review and rating deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
