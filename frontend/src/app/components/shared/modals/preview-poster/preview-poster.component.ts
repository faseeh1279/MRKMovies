import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-preview-poster',
  standalone: false,
  templateUrl: './preview-poster.component.html',
  styleUrl: './preview-poster.component.css'
})
export class PreviewPosterComponent {
  closeModal = output<boolean>();
  moviePoster = input<string>(''); 
  reviewSubmitError = signal<boolean>(false); 

 


  changeModalState() {
    this.closeModal.emit(false);
  }
}
