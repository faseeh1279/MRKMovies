import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
  Observable,
} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private router = inject(Router);
  private authService = inject(AuthService);
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      req = this.addToken(req, accessToken);
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        return this.authService.generateNewAccessToken(refreshToken).pipe(
          switchMap((response) => {
            this.isRefreshing = false;

            // ✅ Fixed: Emit the new token
            const newAccessToken = response.access;
            localStorage.setItem('access_token', newAccessToken);
            this.refreshTokenSubject.next(newAccessToken);

            // ✅ Retry the original request with the new token
            return next.handle(this.addToken(request, newAccessToken));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.authService.logout();
            this.router.navigate(['/users/login']);
            return throwError(() => error);
          })
        );
      } else {
        this.authService.logout();
        this.router.navigate(['/users/login']);
        return throwError(() => new Error('Refresh token is missing'));
      }
    } else {
      // ✅ If refreshing is already in progress, wait for the new token
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addToken(request, token as string)))
      );
    }
  }
}
