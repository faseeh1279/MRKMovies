import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../users/service/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService); 
  
  ngOnInit(): void {
    const subscription = this.authService.getCurrentUser().subscribe({
      next: (result) => { 
        console.log(result); 
      }, 
      error: (error) => { 
        console.error(error); 
      }
    }); 
    
  }
}
