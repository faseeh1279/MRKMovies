from django.db import models
from django.contrib.auth.models import User 
# Create your models here.

class Profile(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    def __str__(self):
        return str(self.user)



