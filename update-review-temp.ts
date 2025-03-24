import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';
import { Router } from '@angular/router';
import { type MovieReview as MovieReviewInterface} from '../../models/shared.model';

@Component({
  selector: 'app-update-review',
  standalone: false,
  templateUrl: './update-review.component.html',
  styleUrl: './update-review.component.css'
})
export class UpdateReviewComponent {

  movieReviewId = input<any>(); 
  movieData = input<any>();
  submitReview = output<boolean>();
  reviewSubmitError = signal<boolean>(false); 
  movieRating = signal<number | null>(3); 
  loadingScreen = signal<boolean>(false); 
  reviewsService = inject(ReviewsService); 
  private destroyRef = inject(DestroyRef); 
  private router = inject(Router); 
  private reviewService = inject(ReviewsService); 
  

  reviewForm = new FormGroup({
    review: new FormControl('', { validators: [Validators.required]}), 
    ratingControl: new FormControl(3) 
  })

  setRating(value:number) { 
    this.reviewForm.controls.ratingControl.setValue(value); 
    this.movieRating.set(this.reviewForm.controls.ratingControl.value); 
  }


  onSubmit(event: Event) {
    event.preventDefault();
    this.loadingScreen.set(true); 
    if(this.reviewControlInvalid){ 
      this.reviewSubmitError.set(true); 
      return; 
    }
    const formData = new FormData(); 
    formData.append('movie', (this.movieData().id).toString());  
    formData.append('review', (this.reviewForm.controls.review.value)?.toString() ?? ''); 
    let review = (formData.get('review'))?.toString(); 

    let movie = Number((formData.get('movie'))?.toString()); 
    console.log("Movie ID: ",movie); 
    const modifiedRequest = { 
      'review_text': review, 
      'rating': this.movieRating()?.toString(), 
    }
    console.log("Modified Request",modifiedRequest);
     
    const review_id: string = this.movieReviewId().toString(); 
    const subscription = this.reviewsService.updateReview(modifiedRequest, review_id).subscribe({ 
      next: (result) => { 
        console.log(result); 

        this.reviewService.fetchMovieReviews(); 
        this.loadingScreen.set(false); 
        
        setTimeout(() => {
          this.changeModalState(); 
          this.router.navigate(['/features/view-review/', movie]); 

        }, 5000); 
        
      }, 
      error: (err) => { 
        console.error(err); 
        this.loadingScreen.set(false); 
      }
    }); 

    this.destroyRef.onDestroy(() => subscription.unsubscribe()); 
    this.changeModalState(); 

  }

  get reviewControlInvalid() : boolean { 
    const reviewData = this.reviewForm.controls.review; 
    return reviewData.invalid; 
  }

  get reviewControl(): boolean { 
    const reviewData = this.reviewForm.controls.review; 
    return reviewData.invalid && (reviewData.dirty || reviewData.touched);
  }


  changeModalState() {
    this.submitReview.emit(false);
  }
  saveReview(updatedReview: MovieReviewInterface) {
    this.reviewService.updateReview(updatedReview, updatedReview.review_id).subscribe(() => {
      this.reviewService.fetchMovieReviews(); // Trigger BehaviorSubject update
    });
  }
}
