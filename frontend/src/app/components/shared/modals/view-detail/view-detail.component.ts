import { Component, DestroyRef, inject, Input, input, OnInit, output, signal } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { type MovieReview as MovieReviewInterface } from '../../models/shared.model';
import { HttpClient } from '@angular/common/http';
 

@Component({
  selector: 'app-view-detail',
  standalone: false,
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.css'
})


export class ViewDetailComponent implements OnInit {

  closeDetail = output<boolean>();
  movieData = input<any>();
  isReviewPresent = signal<boolean>(true); 
  movieReviewObject!:MovieReviewInterface[]; 
  private reviewService = inject(ReviewsService); 
  private destroyRef = inject(DestroyRef); 
  // Testing 
  private httpClient = inject(HttpClient); 

  
  
  ngOnInit(): void {
    const subscription = this.reviewService.getMovieReviews().subscribe({ 
      next: (result) => { 
        this.movieReviewObject = result as MovieReviewInterface[]; 
        console.log(result); 
      }, 
      error: (err) => { 
        console.error(err); 
      }
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe()); 
     

  }

  changeModalState() {
    this.closeDetail.emit(false);
  }

  get movieReview(): MovieReviewInterface | undefined { 
    if (!this.movieReviewObject) return undefined; 
    return this.movieReviewObject.find(movie => movie.movie_name === this.movieData()!.title); 
  }

  
}
