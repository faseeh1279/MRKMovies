from django.db import models
from django.contrib.auth.models import User 
# Automatic Registeration with Simple Token Authentication Method 
# from django.dispatch import receiver 
# from rest_framework.authtoken.models import Token
# from django.conf import settings 
# from django.db.models.signals import post_save 


# Create your models here.

class Profile(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    def __str__(self):
        return str(self.user)
    




# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs): 
#     if created: 
#         Token.objects.create(user=instance) # Only needed for Simple Token Authentication