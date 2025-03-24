import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ReviewsService } from '../../shared/services/reviews.service';
import { type MovieReview as MovieReviewInterface, type Movie as MovieInterface } from '../../shared/models/shared.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reviews',
  standalone: false,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {

  private reviewService = inject(ReviewsService);
  moviesList!: MovieInterface[];
  movieReviewList!: any; 
  userReviews!: string[];  
  

  ngOnInit(): void {
    this.reviewService.getMovieList().then(res => this.moviesList = res);
    this.reviewService.reviewedMovies$.subscribe(result => this.movieReviewList = result); 
  }
}
