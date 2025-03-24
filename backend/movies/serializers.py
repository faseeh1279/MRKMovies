from rest_framework import serializers
from .models import Movie, Genre, Person

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        exclude = ['id']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        exclude = ['id']

class MovieSerializer(serializers.ModelSerializer):
    genre_names = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)
    director_names = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)
    actor_names = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)
    
    genres = GenreSerializer(many=True, read_only=True)
    directors = PersonSerializer(many=True, read_only=True)
    actors = PersonSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = "__all__"
        read_only_fields = ['user']  # Prevent user from being modified

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user  # Assign logged-in user
        
        genre_names = validated_data.pop('genre_names', [])
        director_names = validated_data.pop('director_names', [])
        actor_names = validated_data.pop('actor_names', [])
        
        movie = Movie.objects.create(**validated_data)
        
        def get_or_create_instances(model, names):
            return [model.objects.get_or_create(name=name.strip())[0] for name in names if name.strip()]
        
        movie.genres.set(get_or_create_instances(Genre, genre_names))
        movie.directors.set(get_or_create_instances(Person, director_names))
        movie.actors.set(get_or_create_instances(Person, actor_names))
        
        return movie
    
    def update(self, instance, validated_data):
        request = self.context.get('request')
        
        # Ensure user can only update their own movies
        if request.user != instance.user:
            raise serializers.ValidationError("You can only edit your own movies.")
        
        # Extract ManyToMany related data
        genre_names = validated_data.pop('genre_names', None)  # Use None instead of []
        director_names = validated_data.pop('director_names', None)
        actor_names = validated_data.pop('actor_names', None)
        
        # Update only the fields that are present in validated_data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        def get_or_create_instances(model, names):
            return [model.objects.get_or_create(name=name.strip())[0] for name in names if name.strip()]

        # Only update ManyToMany fields if they are provided in the request
        if genre_names is not None:
            instance.genres.set(get_or_create_instances(Genre, genre_names))
        if director_names is not None:
            instance.directors.set(get_or_create_instances(Person, director_names))
        if actor_names is not None:
            instance.actors.set(get_or_create_instances(Person, actor_names))
        
        return instance