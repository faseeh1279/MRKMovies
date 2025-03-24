import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/services/movies.service';
import { type Movie as MovieInterface } from '../../shared/models/shared.model';
@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit{
  private movieService = inject(MoviesService); 
  moviesList!: MovieInterface[]; 


  ngOnInit(): void {
    this.movieService.getUserMovies().subscribe({ 
      next: (result) => { 
        this.moviesList = result as MovieInterface[]; 
      }, 
      error: (err) => { 
        console.log(err); 
      }
    })  
  }
}
