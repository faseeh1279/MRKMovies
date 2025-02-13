from django.urls import path 
from . import views 

urlpatterns = [ 
    path("list-users/", views.UsersListAV.as_view(), name='list-users'), 
]