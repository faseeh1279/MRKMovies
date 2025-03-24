import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  standalone: false,
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {
  submitReview = output<boolean>();
  movieData = input<any>();
  reviewSubmitError = signal<boolean>(false); 
  movieRating = signal<number | null>(3); 
  loadingScreen = signal<boolean>(false); 
  reviewsService = inject(ReviewsService); 
  private destroyRef = inject(DestroyRef); 
  private router = inject(Router); 
  

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
  
    if (this.reviewControlInvalid) {
      this.reviewSubmitError.set(true);
      return;
    }
  
    const formData = new FormData();
    formData.append('movie', (this.movieData().id).toString());
    formData.append('review', this.reviewForm.controls.review.value?.toString() ?? '');
    let review = formData.get('review')?.toString();
    let movie = Number((formData.get('movie')?.toString()));
  
    const modifiedRequest = {
      'review_text': review,
      'movie': movie,
      'rating': this.movieRating()
    };
  
    const subscription = this.reviewsService.addReview(modifiedRequest).subscribe({
      next: (result) => {
        console.log(result);
        this.loadingScreen.set(false);
        
        // ✅ Emit event to refresh movies list after adding a review
        this.submitReview.emit(true);
  
        this.router.navigate(['/features/reviews']);
      },
      error: (err) => {
        console.error(err);
        this.loadingScreen.set(false);
      }
    });
  
    this.changeModalState();
    this.reviewsService.filterUserReviewMovies(); 
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
}
