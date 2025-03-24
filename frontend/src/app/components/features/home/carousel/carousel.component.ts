import { Component, Input, OnInit } from '@angular/core';
import { type Movie as MovieInterface } from '../../../shared/models/shared.model';

@Component({
  selector: 'app-carousel',
  standalone: false,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit{
  @Input() movieList: MovieInterface[] = [];

  moviePosters:string[] = []; 

  
  
  ngOnInit(): void { 
    if(this.movieList){ 
      this.moviePosters = this.movieList.filter(movie => movie.poster).map(movie=> movie.poster)
      console.log('Movie Posters: ', this.moviePosters); 
    }
  }
}
