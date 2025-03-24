import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';
import { Router } from '@angular/router';
import { type MovieReview as MovieReviewInterface, type Movie as MovieInterface } from '../../models/shared.model';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-update-review',
  standalone: false,
  templateUrl: './update-review.component.html',
  styleUrl: './update-review.component.css'
})
export class UpdateReviewComponent {

  movieReviewId = input<any>();
  submitReview = output<boolean>();
  movieData = input<any>();
  reviewSubmitError = signal<boolean>(false);
  movieRating = signal<number | null>(3);
  loadingScreen = signal<boolean>(false);
  reviewsService = inject(ReviewsService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private reviewService = inject(ReviewsService);
  private movieService = inject(MoviesService);


  reviewForm = new FormGroup({
    review: new FormControl('', { validators: [Validators.required] }),
    ratingControl: new FormControl(3)
  })

  setRating(value: number) {
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
    formData.append('review', (this.reviewForm.controls.review.value)?.toString() ?? '');
    let review = (formData.get('review'))?.toString();
    let movie = Number((formData.get('movie'))?.toString());

    const modifiedRequest = {
      'review_text': review,
      'rating': this.movieRating()?.toString(),
    }

    const review_id: string = this.movieReviewId().toString();
    this.reviewsService.updateReview(modifiedRequest, review_id).subscribe({
      next: (result) => {

        this.fetchAllReviews(this.movieData().title).then(res => {
          console.log("Updated Reviews : ", res);
          this.reviewService.updatedReview(res);
        })

        this.loadingScreen.set(false);


        this.router.navigate(['/features/view-review/', movie]);
        this.changeModalState();



      },
      error: (err) => {
        console.error(err);
        this.loadingScreen.set(false);
      }
    });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe()); 
    // this.changeModalState();

  }

  get reviewControlInvalid(): boolean {
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

  fetchAllReviews = (movieTitle: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      let movie_reviews!: MovieReviewInterface[];
      this.reviewService.getMovieReviews().subscribe({
        next: (result) => {
          movie_reviews = result;
          resolve(movie_reviews.filter((movie) => movie.movie_name === movieTitle));
        },
        error: (err) => reject(err)
      });
    });
  }

  // fetchCurrentUser = (): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     this.reviewService.getCurrentUser().subscribe({
  //       next: (result) => resolve(result.username as string),
  //       error: (err) => reject(err)
  //     });
  //   });
  // }

  // fetchMovie = (movieId: string): Promise<MovieInterface | undefined> => {
  //   return new Promise((resolve, reject) => {
  //     this.movieService.getMovieList().subscribe({
  //       next: (result) => {
  //         const moviesList = result as MovieInterface[];
  //         const movieObject = moviesList.find(movie => movie.id === movieId);
  //         resolve(movieObject);
  //       },
  //       error: (err) => reject(err)
  //     });
  //   });
  // }

  // filterReviews = (movieId: string): Promise<any> => {
  //   return Promise.all([
  //     this.fetchAllReviews(),
  //     this.fetchCurrentUser(),
  //     this.fetchMovie(movieId)
  //   ]).then(([reviews, currentUser, movie]) => {
  //     if (!movie) {
  //       console.warn("No matching movie found.");
  //       return [];
  //     }

  //     const modifiedData = reviews.filter(
  //       (review: { movie_name: string }) => review.movie_name === movie.title
  //     );

  //     console.log("Filtered Reviews:", modifiedData);
  //     return modifiedData;
  //   }).catch((error) => {
  //     console.error("Error in filtering reviews:", error);
  //     throw error;
  //   });
  // }



}
