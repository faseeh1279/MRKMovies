import { Component, effect, inject, Input, OnInit, signal } from '@angular/core';
import { type Movie as MovieInterface } from '../../models/shared.model';
import { Router } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-card-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})

export class ReviewComponent implements OnInit {
  @Input() movieList!: MovieInterface;
  @Input() reviewedMovieList!: MovieInterface;
  userReviews!: string[]; 
  addReview = signal<boolean>(false);
  private router = inject(Router);
  reviewedPresent = signal<boolean>(false);
  private reviewService = inject(ReviewsService);
  
  constructor() { }

  ngOnInit(): void {
    this.reviewService.reviewedMovies$.subscribe(result => this.userReviews = result);  
    this.reviewService.filterUserReviewedMovies(); 
    if (this.movieList.title in this.userReviews) { 
      this.reviewedPresent.set(true); 
    }
  }

  addMovieReview(movie: MovieInterface) {
    this.addReview.set(true);
  }

  viewMovieReview(movie: MovieInterface) {
    let id = movie.title as string;
    this.router.navigate(['/features/view-review', id]);
  }
}
