from rest_framework import serializers
from .models import Review, Rating
from movies.models import Movie

class AddReviewSerializer(serializers.ModelSerializer):
    movie = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all())
    user = serializers.ReadOnlyField(source='user.username')  # Show username in response
    movie_name = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'user', 'movie', 'movie_name', 'review_text', 'created_at', 'rating']

    def get_movie_name(self, obj):
        return obj.movie.title

    def get_rating(self, obj):
        """Fetches the rating provided by the user who created the review."""
        rating = Rating.objects.filter(user=obj.user, movie=obj.movie).first()
        return rating.rating if rating else None


    def create(self, validated_data):
        # ✅ Assign the authenticated user to the review
        request = self.context.get('request')
        if request and request.user:
            validated_data['user'] = request.user
        return super().create(validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['review_id'] = data.pop('id')
        data['movie_id'] = data.pop('movie')
        return data
