import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  standalone: false,
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css'
})
export class LoadingScreenComponent {
  @Input() size: number = 32; // Default size is 8 (can be changed dynamically)
}
