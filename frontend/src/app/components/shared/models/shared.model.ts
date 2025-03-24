export interface MovieReview {
  user: string; 
  movie_name: string; 
  review_text: string; 
  created_at: string; 
  rating: number; 
  review_id: string; 
  movie_id: string; 
};

export interface Movie {
  title: string; 
  description: string; 
  release_date: string; 
  duration: string; 
  genres: string; 
  directors: string; 
  actors: string; 
  poster: string; 
  created_at: string; 
  id?: string; 
}