import { Component, effect, inject, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgControlStatusGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { map, tap } from 'rxjs';
import { type Movie as MovieInterface } from '../../models/shared.model';

@Component({
  selector: 'app-edit-form',
  standalone: false,
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent implements OnInit {
  formError = signal<boolean>(false);
  deleteCurrentMovie = signal<boolean>(false);
  movieUpdatedSuccessfully = signal<boolean>(false);
  deleteMovie = signal<boolean>(false);
  selectedFile: File | null = null;
  router = inject(Router);
  movieDataObject = signal<MovieInterface | null>(null);
  private routerUrl = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);
  movieId: string | undefined | null;

  imageUrl = signal<string>('');
  constructor() {
    effect(() => {
      if (this.movieDataObject()) {
        this.imageUrl.set(this.movieDataObject()!.poster || ''); // ✅ Update imageUrl when movieDataObject is set
      }

      if (this.deleteCurrentMovie()) {
        let movieId = this.movieDataObject()?.id;
        if (movieId) {
          this.moviesService.deleteMovie(movieId.toString()).subscribe({
            next: () => this.router.navigate(['/features/movies']),
            error: (err) => console.error(err)
          });
        }
      }
    });
  }
  ngOnInit() {
    this.movieId = this.routerUrl.snapshot.paramMap.get('id');
    console.log("Movie ID:", this.movieId);
    console.log("Movie ID Type : ", typeof (this.movieId));

    this.fetchMovieObject(this.movieId)
      .then((movie) => {
        this.movieDataObject.set(movie);
        this.uploadMovieForm.patchValue({
          title: movie.title || '',
          description: movie.description || '',
          releaseDate: movie.release_date || '',
        })
        this.addSelectedActors();
        this.addSelectedDirectors();
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
      });
  }


  uploadMovieForm = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    movie_poster: new FormControl<File | null>(null, { nonNullable: true }),
    description: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    actors: new FormArray([]),
    directors: new FormArray([]),
    releaseDate: new FormControl('', { validators: [Validators.required] }),
  })


  async onSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', this.uploadMovieForm.value.title || '');
    formData.append('description', this.uploadMovieForm.value.description || '');
    formData.append('release_date', this.uploadMovieForm.value.releaseDate || '');

    // Append actors and directors
    this.uploadMovieForm.value.directors?.forEach((director: string) => {
      if (director) formData.append('director_names', director);
    });
    this.uploadMovieForm.value.actors?.forEach((actor: string) => {
      if (actor) formData.append('actor_names', actor);
    });

    // ✅ Convert existing poster URL to File if no new file is selected
    if (this.selectedFile instanceof File) {
      formData.append('poster', this.selectedFile);
    } else if (this.imageUrl()) {
      const file = await urlToFile(this.imageUrl(), 'existing_poster.jpg');
      formData.append('poster', file);
    }
    let MOVIEID = this.movieDataObject()?.id as string;
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    this.moviesService.updateMovie(MOVIEID, formData).subscribe({
      next: (result) => {
        console.log(result);
        this.movieUpdatedSuccessfully.set(true); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0]; // ✅ Store selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl.set(reader.result as string); // ✅ Update preview
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  deleteMovieBtn = () => {
    this.deleteMovie.set(true);

  }

  get Actors(): FormArray {
    return this.uploadMovieForm.get('actors') as FormArray;
  }

  get Directors(): FormArray {
    return this.uploadMovieForm.get('directors') as FormArray;
  }

  addSelectedActors() {
    const movie = this.movieDataObject();

    if (!movie || !Array.isArray(movie.actors)) {
      // console.warn("No actors found or movieDataObject is null");
      return;
    }

    for (let actor of movie.actors) {
      // console.log("Adding Actor:", actor); 

      if (actor && actor.name) {
        this.Actors.push(new FormControl(actor.name, { validators: [Validators.required] }));
      } else {
        console.warn("Skipping invalid actor:", actor);
      }
    }

    // console.log("Updated Actors FormArray:", this.Actors.value);
  }

  addSelectedDirectors() {
    const movie = this.movieDataObject();
    if (!movie || !Array.isArray(movie.directors)) {
      return;
    }
    for (let director of movie.directors) {
      if (director && director.name) {
        this.Directors.push(new FormControl(director.name, { validators: [Validators.required] }))
      } else {
        console.warn("Skipping invalid director: ", director);
      }
    }
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
  // ✅ Fetch the specific movie object
  fetchMovieObject(movieId: string | null): Promise<MovieInterface> {
    return new Promise((resolve, reject) => {
      this.moviesService.getMovieList().subscribe({
        next: (result) => {
          let movieList = result as MovieInterface[];
          let movie = movieList.find((m) => m.title === movieId);

          if (movie) {
            this.movieDataObject.set(movie);

            resolve(movie); // ✅ Movie found, resolve it
          } else {
            reject("Movie not found!"); // ❌ No movie matched the given ID
          }
        },
        error: (err) => {
          reject(err); // ❌ Handle API errors
        }
      });
    });
  }


}
async function urlToFile(url: string, fileName: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const mimeType = blob.type || 'image/jpeg';
  return new File([blob], fileName, { type: mimeType });
}