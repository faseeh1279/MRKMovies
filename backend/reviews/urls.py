from django.urls import path
from .views import AddReviewAV, SingleReviewAV

urlpatterns = [
    path('reviews/', AddReviewAV.as_view(), name='add-review'),  # Handles GET (all reviews) & POST (add review)
    path('reviews/<int:pk>/', SingleReviewAV.as_view(), name='single-review'),  # Handles GET, PUT, DELETE for a single review
]
