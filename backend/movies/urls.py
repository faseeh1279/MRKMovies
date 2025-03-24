from django.urls import path 
from .views import (MovieDetailView, MovieListAV)

urlpatterns = [ 
    path('detail-list/', MovieListAV.as_view(), name='movie-detail-view'), 
    path('edit-movies/', MovieDetailView.as_view(), name='edit-movies'),  
    path('edit-movies/<int:pk>/', MovieDetailView.as_view(), name='movie-detail-view-edit'),  
]