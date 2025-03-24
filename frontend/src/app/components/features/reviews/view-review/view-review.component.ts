import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../shared/services/movies.service';
import { ReviewsService } from '../../../shared/services/reviews.service';
import { MovieReview, type MovieReview as MovieReviewInterface } from '../../../shared/models/shared.model';
import { type Movie as MovieInterface } from '../../../shared/models/shared.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-view-review',
  standalone: false,
  templateUrl: './view-review.component.html',
  styleUrl: './view-review.component.css'
})

export class ViewReviewComponent implements OnInit {
  private router = inject(ActivatedRoute);
  private movieService = inject(MoviesService);
  private reviewService = inject(ReviewsService);
  private movieTitle!: string | null;
  moviePosterPreview = signal<boolean>(false);
  currentUser!: string;
  moviesList: MovieInterface[] = [];
  editReview = signal<boolean>(false);
  // movieReviewObject!: MovieReviewInterface[];
  movieObject: any = null;
  movieReviews!: MovieReviewInterface[];
  movieRatings: any;
  movieReviewId: any;
  reviewSubscription!: Subscription; 

  ngOnInit(): void {
    this.movieTitle = this.router.snapshot.paramMap.get('id');
    this.fetchMovies().then(result => this.movieObject = result);
    this.filterReviews().then(result => {
      this.movieReviews = result;
      this.filterMovieReviewsAlgorithm(this.movieTitle, this.movieReviews).then(result => this.movieRatings = result);
    });
    this.reviewSubscription = this.reviewService.reviews$.subscribe((reviews) => {
      this.movieReviews = reviews;
    });
  }

  editUserReview = () => {
    this.fetchCurrentUserReview(this.movieTitle).then(res => {
      let result: MovieReviewInterface[] = res as MovieReviewInterface[]; 
      let movie_review_id: MovieReviewInterface | undefined; 
      movie_review_id = result.find((movie) => movie.user === this.currentUser && movie.movie_name === this.movieTitle); 
      this.movieReviewId = movie_review_id?.review_id;  
    });
    this.editReview.set(true);
    console.log("Movie Reviews : ", this.movieReviews); 
  }

  // selectMovie = (movie: MovieInterface) => {
  //   this.movieObject = movie;
  //   this.filterReviews().then(result => {
  //     this.movieReviews = result;
  //     this.filterMovieReviewsAlgorithm(movie.title, this.movieReviews).then(result => this.movieRatings = result);
      
  //   });
  // }

  previewPoster() {
    this.moviePosterPreview.set(true);
  }

  fetchMovies(): Promise<MovieInterface | undefined> {
    return new Promise((resolve, reject) => {
      this.movieService.getMovieList().subscribe({
        next: (result) => {
          this.moviesList = result as MovieInterface[];
          let movie_object = this.moviesList.find(movie => movie.title === this.movieTitle);
          resolve(movie_object);
        },
        error: (err) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  fetchAllReviews = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.reviewService.getMovieReviews().subscribe({
        next: (result) => resolve(result),
        error: (err) => reject(err)
      });
    });
  }

  fetchCurrentUser = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.reviewService.getCurrentUser().subscribe({
        next: (result) => resolve(result.username as string),
        error: (err) => reject(err)
      });
    });
  }

  filterReviews = async (): Promise<any> => {
    try {
      const [reviews, current_user] = await Promise.all([
        this.fetchAllReviews(),
        this.fetchCurrentUser()
      ]);

      this.currentUser = current_user;
      if (!this.movieObject) {
        this.movieObject = await this.fetchMovies();
      }

      if (this.movieObject) {
        let modified_data = reviews.filter(
          (movie: { movie_name: any }) => movie.movie_name === this.movieObject.title
        );
        return modified_data;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  // Filter Current Selected Movie Rating Algorithm 
  filterMovieReviewsAlgorithm = (movieTitle: string | null, movieReviews: MovieReviewInterface[]): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (!movieTitle || !movieReviews?.length) {
        return resolve(0);
      }
      let final_reviews = movieReviews.filter(movie => movie.movie_name === movieTitle);
      let num_of_reviews = 0;
      let total_reviews = 0;
      for (let review of final_reviews) {
        total_reviews++;
        num_of_reviews += Number(review.rating) || 0;
      }
      let final_result = total_reviews > 0 ? num_of_reviews / total_reviews : 0;
      resolve(Math.round(final_result));
    });
  }

  fetchCurrentUserReview = (movieTitle: string | null): Promise<any> => {
    return new Promise((resolve, reject) => {
      let movie_reviews!: MovieReviewInterface[];
      let current_user!: string;
      let movie_review_obj!: MovieReviewInterface | undefined;
      this.fetchCurrentUser().then((result) => {
        current_user = result;
        this.reviewService.getMovieReviews().subscribe({
          next: (result) => {
            movie_reviews = result;
            movie_review_obj = movie_reviews.find((movie) => {
              movie.movie_name === movieTitle && movie.user === current_user
            });
            resolve(movie_reviews);
          },
          error: (err) => reject(err)
        });
      })
    })
  }


  // UI Updation Not Code 
  hoverEffect = signal<boolean>(false);
  hoverEffectText = signal<string>('assets/Edit PNG.png');
  onHover(isHovered: boolean) {
    if (isHovered) {
      this.hoverEffectText.set('assets/Edit PNG hover.png')
    }
    else {
      this.hoverEffectText.set('assets/Edit PNG.png')
    }
    this.hoverEffect.set(isHovered ? isHovered : false);
  }
}
