import { Component, Input, signal } from '@angular/core';
import { type Movie as MovieInterface} from '../models/shared.model';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() movieList!: MovieInterface;
  addReview = signal<boolean>(false); 

  addMovieReview(movie: MovieInterface) { 
    console.log('Add Review for : ', movie.title); 
    this.addReview.set(true); 
  }
}
