from django.db import models
from django.contrib.auth.models import User 



class Profile(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    def __str__(self):
        return str(self.user)
    

class PostMessage(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField() 
    email = models.EmailField()
    def __str__(self): 
        return str(self.user)


