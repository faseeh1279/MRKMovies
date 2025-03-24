import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-uploaded',
  standalone: false,
  templateUrl: './movie-uploaded.component.html',
  styleUrl: './movie-uploaded.component.css'
})
export class MovieUploadedComponent {
  successStateInput = input<boolean>();
  successStateOutput = output<boolean>();
  private router = inject(Router);

  closeModal() {
    this.successStateOutput.emit(false);  // Emit false to close the modal
    this.router.navigate(['/features/home']);
  }
}
