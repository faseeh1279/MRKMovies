import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../users/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private routerLink = inject(Router);
  isHomeActive = signal(false);
  isMovieActive = signal(false);
  isReviewActive = signal(false);
  isContactActive = signal(false);
  isAboutActive = signal(false);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.routerLink.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomeActive.set(event.url === '/home');
        this.isMovieActive.set(event.url === '/movies' || event.url === '/edit-movie');
        this.isReviewActive.set(event.url === '/reviews' || event.url === '/view-review');
        this.isContactActive.set(event.url === '/contact');
        this.isAboutActive.set(event.url === '/about');
      }
    });

  }

}
