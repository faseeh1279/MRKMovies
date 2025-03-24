import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type Movie as MovieInterface} from '../models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private httpClient = inject(HttpClient); 
  private MovieListURL = "http://127.0.0.1:1234/movies/detail-list/"; 
  private UserMoviesURL = "http://127.0.0.1:1234/movies/edit-movies/";
  private DeleteMovieURL = "http://127.0.0.1:1234/movies/edit-movies/"; 
  private UpdateMovieURL = "http://127.0.0.1:1234/movies/edit-movies/"; 

  getMovieList() { 
    return this.httpClient.get(this.MovieListURL); 
  }

  getUserMovies() {
    return this.httpClient.get(this.UserMoviesURL); 
  }

  deleteMovie(id: string) { 
    return this.httpClient.delete(this.DeleteMovieURL + id + '/'); 
  }

  updateMovie(id: string, movieData:any) { 
    return this.httpClient.put(this.UpdateMovieURL + id + '/', movieData);  
  }
}
