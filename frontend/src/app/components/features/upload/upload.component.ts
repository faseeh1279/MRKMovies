import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from './services/upload.service';
import { MOVIE_GENRES } from './data/movie-genres';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
  validationError = signal<boolean>(false);
  movieGenres = signal<string[]>(MOVIE_GENRES);
  isSubmitting = signal<boolean>(false);
  currentStep = signal<number>(1);
  loadingScreen = signal<boolean>(false);
  formError = signal<boolean>(false);
  formSuccess = signal<boolean>(false);
  uploadServices = inject(UploadService);
  selectedFile: File | null = null; // Store selected file spearately.
  constructor() {
  }

  ngOnInit(): void {
  }

  // Handles File selection 
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Stores the file separately.
    }
  }


  uploadMovieForm = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    genre: new FormControl('', { validators: [Validators.required] }),
    movie_poster: new FormControl<File | null>(null, { validators: [Validators.required], nonNullable: true }),
    description: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    actors: new FormArray([]),
    directors: new FormArray([]),
    releaseDate: new FormControl('', { validators: [Validators.required] }),
  })





  // Previous Step 
  prevStep = () => {
    if (this.currentStep() === 1) {
      return;
    }
    this.currentStep.update((curr) => curr - 1);
  }
  // Next Step 
  nextStep = () => {
    if (this.movieTitleInvalid || this.movieGenreInvalid || this.moviePosterInvalid || this.movieDescriptionInvalid || this.movieDirectorsInvalid || this.movieActorsInvalid || this.movieReleaseDateInvalid) {
      this.formError.set(true);
      return;
    }

    if (this.currentStep() < 3) {
      this.currentStep.update((curr) => curr + 1);
    }
  }

  // Submit Forms 
  onSubmit(event: Event) {
    event.preventDefault();
  
    if (this.uploadMovieForm.invalid) {
      this.formError.set(true);
      return;
    }
  
    this.isSubmitting.set(true);
    this.formError.set(false);
  
    const formData = new FormData();
    formData.append('title', this.uploadMovieForm.value.title || '');
    formData.append('description', this.uploadMovieForm.value.description || '');
    formData.append('release_date', this.uploadMovieForm.value.releaseDate || '');
  
    // Ensure genre is always an array
    const genreNames = Array.isArray(this.uploadMovieForm.value.genre)
      ? this.uploadMovieForm.value.genre
      : [this.uploadMovieForm.value.genre].filter(Boolean);
  
    // Convert array to JSON or string format
    formData.append('genre_names', JSON.stringify(genreNames));  // Or use genreNames.join(',')
  
    // Append director_names
    this.uploadMovieForm.value.directors?.forEach((director: string) => {
      if (director) formData.append('director_names', director);
    });
  
    // Append actor_names
    this.uploadMovieForm.value.actors?.forEach((actor: string) => {
      if (actor) formData.append('actor_names', actor);
    });
  
    // Append file correctly
    if (this.selectedFile instanceof File) {
      formData.append('poster', this.selectedFile);
    }
    console.log(formData); 
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    this.uploadServices.uploadMovie(formData).subscribe({
      next: (result) => {
        console.log('Movie uploaded successfully:', result);
        this.formSuccess.set(true);
        this.uploadMovieForm.reset();
        this.selectedFile = null; // Reset file selection
      },
      error: (err) => {
        console.error('Upload failed:', err);
        this.formError.set(true);
      },
      complete: () => {
        this.isSubmitting.set(false);
      }
    });
  }



  // Modal Validation
  get movieTitleInvalid(): boolean {
    const enteredMovieTitle = this.uploadMovieForm.controls.title;
    return enteredMovieTitle.invalid;
  }

  get movieGenreInvalid(): boolean {
    const enteredMovieGenre = this.uploadMovieForm.controls.genre;
    return enteredMovieGenre.invalid;
  }

  get moviePosterInvalid(): boolean {
    const enteredMoviePoster = this.uploadMovieForm.controls.movie_poster;
    return enteredMoviePoster.invalid;
  }

  get movieDescriptionInvalid(): boolean {
    const enteredMovieDescription = this.uploadMovieForm.controls.description;
    return enteredMovieDescription.invalid;
  }

  get movieActorsInvalid(): boolean {
    const enteredMovieActor = this.uploadMovieForm.controls.actors;
    return enteredMovieActor.invalid;
  }

  get movieDirectorsInvalid(): boolean {
    const enteredMovieDirector = this.uploadMovieForm.controls.directors;
    return enteredMovieDirector.invalid;
  }

  get movieReleaseDateInvalid(): boolean {
    const enteredMovieReleaseDate = this.uploadMovieForm.controls.releaseDate;
    return enteredMovieReleaseDate.invalid && (enteredMovieReleaseDate.dirty || enteredMovieReleaseDate.touched);
  }

  // Validation UI
  get movieTitle(): boolean {
    const enteredMovieTitle = this.uploadMovieForm.controls.title;
    return enteredMovieTitle.invalid && (enteredMovieTitle.dirty || enteredMovieTitle.touched);

  }
  get movieGenre(): boolean {
    const enteredMovieGenre = this.uploadMovieForm.controls.genre;
    return enteredMovieGenre.invalid && (enteredMovieGenre.dirty || enteredMovieGenre.touched);
  }
  get moviePoster(): boolean {
    const enteredMoviePoster = this.uploadMovieForm.controls.movie_poster;
    return enteredMoviePoster.invalid && (enteredMoviePoster.dirty || enteredMoviePoster.touched);
  }

  get movieDescription(): boolean {
    const enteredMovieDescription = this.uploadMovieForm.controls.description;
    return enteredMovieDescription.invalid && (enteredMovieDescription.dirty || enteredMovieDescription.touched);
  }

  get movieActors(): boolean {
    const enteredMovieActors = this.uploadMovieForm.controls.actors;
    return enteredMovieActors.invalid;
  }

  get movieDirectors(): boolean {
    const enteredMovieDirector = this.uploadMovieForm.controls.directors;
    return enteredMovieDirector.invalid;
  }

  get movieReleaseDate(): boolean {
    const enteredMovieReleaseDate = this.uploadMovieForm.controls.releaseDate;
    return enteredMovieReleaseDate.invalid && (enteredMovieReleaseDate.dirty || enteredMovieReleaseDate.touched);
  }

  get Actors(): FormArray {
    return this.uploadMovieForm.get('actors') as FormArray;
  }

  get Directors(): FormArray {
    return this.uploadMovieForm.get('directors') as FormArray;
  }

  // Add a new FormControl to the FormArray
  addActor() {
    this.Actors.push(new FormControl('', { validators: [Validators.required] })); // Add empty input field 
  }

  // Remove a FormControl from the FormArray
  removeActors(index: number) {
    this.Actors.removeAt(index);
  }

  addDirector() {
    this.Directors.push(new FormControl('', { validators: [Validators.required] })); // Add empty input field 
  }

  removeDirectors(index: number) {
    this.Directors.removeAt(index);
  }
}
