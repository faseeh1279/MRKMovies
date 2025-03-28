from django.urls import path 
from rest_framework.authtoken.views import obtain_auth_token
from .views import (registration_view, logout_view, UserInterface)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [ 
    path('login/', obtain_auth_token, name='login'), 
    path("register/", registration_view, name='register'), 
    path("logout/", logout_view, name='logout'), 
    path("users/", UserInterface.as_view(), name='users-interface'),
    
    # Token Generation [Access & Refresh]
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
]
    