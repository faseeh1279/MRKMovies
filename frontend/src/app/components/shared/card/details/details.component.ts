import { Component, Input, OnInit, signal } from '@angular/core';
import { type Movie as MovieInterface } from '../../models/shared.model';

@Component({
  selector: 'app-card-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  @Input() movieList!: MovieInterface;
  closeModal = signal<boolean>(false);

  viewMovieDetail() {
    this.closeModal.set(true);
  }
  ngOnInit(): void {
    
  }
}
