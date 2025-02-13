from django.db import models
from django.contrib.auth.models import User 
from movies.models import Movie

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} added {self.movie.title} to watchlist'
