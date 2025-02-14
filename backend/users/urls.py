from django.urls import path 
from rest_framework.authtoken.views import obtain_auth_token
from .views import (UsersListAV, registration_view)


urlpatterns = [ 
    path("list-users/", UsersListAV.as_view(), name='list-users'), 
    path('login/', obtain_auth_token, name='login'), 
    path("register/", registration_view, name='register'), 
]