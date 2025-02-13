from django.db import models
from movies.models import Movie 
from django.contrib.auth.models import User 
# Create your models here.


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.user.username} on {self.movie.title}'

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='ratings')
    rating = models.PositiveSmallIntegerField(choices=[(i, str(i)) for i in range(1, 11)])

    class Meta:
        unique_together = ('user', 'movie')  # Prevents duplicate ratings from the same user

    def __str__(self):
        return f'Rating {self.rating} by {self.user.username} for {self.movie.title}'
