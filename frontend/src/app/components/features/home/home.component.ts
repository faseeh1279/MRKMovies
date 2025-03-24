import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/services/movies.service';
import { type Movie as MovieInterface } from '../../shared/models/shared.model';
import { ReviewsService } from '../../shared/services/reviews.service';
import { type MovieReview as MovieReviewInterface} from '../../shared/models/shared.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private moviesService = inject(MoviesService); 
  private reviewService = inject(ReviewsService); 
  private destroyRef = inject(DestroyRef); 
  moviesList: MovieInterface[] = [];
  moviesReviewList!: MovieReviewInterface[]; 
  movieReviewObject!: MovieReviewInterface | undefined; 
  ngOnInit(): void {
    const movieListSubscription = this.moviesService.getMovieList().subscribe({ 
      next: (result) => { 
        this.moviesList = result as MovieInterface[];  
      }, 
      error: (err) => { 
        console.error(err); 
      }
    }); 
    
    this.destroyRef.onDestroy(() => { 
      movieListSubscription.unsubscribe(); 
    })
  }
  
}
