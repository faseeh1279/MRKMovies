import { Component, inject, Input } from '@angular/core';
import { type Movie as MovieInterface } from '../../models/shared.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Input() movieDetail!:MovieInterface; 
  private router = inject(Router); 


  editMovie = (movie: MovieInterface) => {
    let id = movie.title as string; 
    this.router.navigate(['/features/edit-movie', id]); 
  }
}
