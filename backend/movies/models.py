from django.db import models

# Create your models here.
class Genre(models.Model): 
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name 
    
class Person(models.Model): 
    name = models.CharField(max_length=255)
    birth_date = models.DateField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    # photo = models.ImageField(upload_to='people/', blank=True, null=True)
    photo = models.URLField(blank=True, null=True)
    def __str__(self):
        return self.name 

class Movie(models.Model): 
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    genres = models.ManyToManyField(Genre, related_name='movies')
    directors = models.ManyToManyField(Person, related_name='directed_movies')
    actors = models.ManyToManyField(Person, related_name='acted_movies')
    # writers = models.ManyToManyField(Person, related_name='written_movies')
    poster = models.ImageField(upload_to='posters/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title 
