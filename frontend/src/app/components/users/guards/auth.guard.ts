import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject the AuthService 
  const router = inject(Router); // Inject the Router 
  if(authService.isAuthenticated()) { 
    return true; // Allow navigation
  }
  else { 
    router.navigate(['/users/login'], { queryParams: {returnUrl : state.url}}); // Redirect to login
    return false; // Block access
  }
};
