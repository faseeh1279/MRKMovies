import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { error } from "console";

export class AuthInterceptor implements HttpInterceptor { 
  private authService = inject(AuthService); 

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = this.authService.getAccessToken(); 
    let authReq = req; 
    if (authToken) { 
      authReq = req.clone({
        setHeaders: {Authorization: `Bearer ${authToken}`}
      }); 
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => { 
        if (error.status === 401) { 
          return this.authService.getRefreshToken().pipe(
            switchMap((newToken) => { 
              const newAuthReq = req.clone({
                setHeaders: {Authorization: `Bearer ${newToken}`}
              }); 
              return next.handle(newAuthReq); 
            }), 
            catchError((refreshError) => { 
              this.authService.logout(); 
              return throwError(() => refreshError); 
            })
          ); 
        }
        return throwError(() => error); 
      })
    )
  }
}