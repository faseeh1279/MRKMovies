import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  errorText = input<string>(); 
  errorStateInput = input<boolean>(); 
  errorStateOutput = output<boolean>(); 
  errorTextTitle = input<string>(); 
  btnText = input<string>(); 
  confirmDelete = output<boolean>();
  
  deleteMovie() { 
    this.confirmDelete.emit(false);   
  } 
  closeModal() { 
    this.errorStateOutput.emit(false);  // Emit false to close the modal
  }
  
}
