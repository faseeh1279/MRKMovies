import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { type MovieReview as MovieReviewInterface, type Movie as MovieInterface } from '../models/shared.model';

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {
  private MovieListURL = "http://127.0.0.1:1234/movies/detail-list/";
  private AddReviewURL = "http://127.0.0.1:1234/movie-reviews/reviews/";
  private DeleteReviewURL = "http://127.0.0.1:1234/reviews/delete-review/";
  private UpdateReviewURL = "http://127.0.0.1:1234/movie-reviews/reviews/";
  private GetAllReviewsURL = "http://127.0.0.1:1234/movie-reviews/reviews/";
  private GetCurrentUserURL = "http://127.0.0.1:1234/account/users/";
  private httpClient = inject(HttpClient);
  // cdr = inject(ChangeDetectorRef); 

  reviewedMovieSubject = new BehaviorSubject<string[]>([]);
  reviewedMovies$ = this.reviewedMovieSubject.asObservable();

  constructor() {
    this.initializeReviewedMovies();
  }

  private async initializeReviewedMovies() {
    try {
      const reviewedMovies = await this.filterUserReviewedMovies();
      this.reviewedMovieSubject.next(reviewedMovies); // Update BehaviorSubject once data is available
    } catch (error) {
      console.error("Error initializing reviewed movies:", error);
    }
  }

  // Get List of Movies Observable
  getMoviesList = (): Observable<any> => {
    return this.httpClient.get(this.MovieListURL);
  }
  // Add Review Observable 
  addReview = (data: { movie: number; review_text: string | undefined }): Observable<any> => {
    return this.httpClient.post(this.AddReviewURL, data);
  }
  // Delete Review Observable 
  deleteReview = (data: any): Observable<any> => {
    return this.httpClient.delete(this.DeleteReviewURL + data.id, data);
  }
  // Update Review Observable 
  updateReview = (data: any, review_id: string): Observable<any> => {
    console.log(this.UpdateReviewURL + review_id + '/');
    return this.httpClient.put(this.UpdateReviewURL + review_id + '/', data);
  }
  // Get Movie Reviews Observable 
  getMovieReviews = (): Observable<any> => {
    return this.httpClient.get(this.GetAllReviewsURL);
  }
  // Get Current Logged In User Observable
  getCurrentUser = (): Observable<any> => {
    return this.httpClient.get(this.GetCurrentUserURL);
  }



  // Get Movies Reviews / List
  getMovieReviewsList = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.getMovieReviews().subscribe({
        next: (result) => {
          resolve(result as MovieReviewInterface[]);
        },
        error: (err) => {
          reject(err);
        }
      });
    })
  }

  getMovieList = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.getMoviesList().subscribe({
        next: (result) => {
          resolve(result as MovieInterface[]);
        },
        error: (err) => {
          reject(err);
        }
      })
    });
  }

  getCurrentLoggedUser = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().subscribe({
        next: (result) => {
          resolve(result);
        },
        error: (err) => {
          reject(err);
        }
      })
    });
  }

  filterUserReviewedMovies = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      // Step 1: Get the current logged-in user
      this.getCurrentLoggedUser()
        .then((user) => {
          const currentUser = user.username; // Ensure we have the username
          let movie_names: string[] = [];
  
          // Step 2: Get the list of movies
          return this.getMovieList().then((movies: MovieInterface[]) => {
            movie_names = movies.map(movie => movie.title);
  
            // Step 3: Get all movie reviews
            return this.getMovieReviewsList();
          }).then((reviews: MovieReviewInterface[]) => {
            
            // Step 4: Filter movies reviewed by the current user
            let userReviewedMovies = reviews
              .filter(review => review.user === currentUser) // Match user's reviews
              .map(review => review.movie_name);
  
            let final_reviews = movie_names.filter(movie => userReviewedMovies.includes(movie));
  
            // Step 5: Resolve with unique reviewed movies
            resolve(this.removeDuplicates(final_reviews));
  
          });
        })
        .catch(error => reject(error)); // Handle any errors
    });
  };
  
  removeDuplicates = (arr: any[]): any[] => {
    const countMap = new Map<any, number>();

    // Count occurrences of each element
    arr.forEach(item => {
      countMap.set(item, (countMap.get(item) || 0) + 1);
    });

    // Filter elements that appear only once
    return arr.filter(item => countMap.get(item) === 1);
  }


  filterUserReviewMovies = () => {
    this.filterUserReviewedMovies().then(res => {
      // console.log("filtering User Review Movies : ",res); 
      this.reviewedMovieSubject.next(res);
    })
  }

  


  // Behavior Subject code 
  private reviewSubject = new BehaviorSubject<MovieReviewInterface[]>([]);

  reviews$ = this.reviewSubject.asObservable();

  updatedReview(newReviews: MovieReviewInterface[]) {
    this.reviewSubject.next(newReviews);
  }

  



  // // Fetch reviews from API and update the Behavior Subject
  // fetchMovieReviews() {
  //   this.getMovieReviews().subscribe({
  //     next: (reviews) => {
  //       this.reviewSubject.next(reviews); // Emit new data
  //     },
  //     error: (err) => {
  //       console.error("Error fetching movie reviews:", err);
  //     }
  //   });
  // }
}
