import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap, throwError } from 'rxjs';
import { type Token } from '../model/auth.model';
import { type loginData } from '../model/auth.model';
import { type registerData } from '../model/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenURL = "http://127.0.0.1:1234/account/api/token/";
    private loginURL = "http://127.0.0.1:1234/account/login/";
    private registerURL = "http://127.0.0.1:1234/account/register/";
    private refreshTokenURL = "http://127.0.0.1:1234/account/api/token/refresh/";
    private getAllUsersURL = "http://127.0.0.1:1234/account/get-users/"; 
    public httpClient = inject(HttpClient);
    

    // Generate token (assuming it's a POST request)
    generateToken = (loginData: loginData): Observable<loginData> => {
        return this.httpClient.post<loginData>(this.tokenURL, loginData);
    }

    // Create HTTP Headers with Authorization Token 
    private getHttpHeaders(tokenData: Token): HttpHeaders {
        
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.access}`
        })
    }

    // Login Method 
    loginData(login: loginData): Observable<any> { 
        return this.httpClient.post(this.loginURL, login).pipe(
            tap(() => { 
                this.httpClient.post(this.tokenURL, login).subscribe({ 
                    next: (result) => { 
                        this.storeTokens(<Token>result); 
                    }, 
                    error: (error) => { 
                        console.error(error); 
                    }
                }); 
            }) 
        );
    }
    // Register Method `
    registerData(register: registerData) {
        return this.httpClient.post(this.registerURL, register);

    }

    // Stores Tokens 
    storeTokens(tokenData: Token): void {
        localStorage.setItem("access_token", tokenData.access);
        localStorage.setItem("refresh_token", tokenData.refresh);
    }
    
    getAccessToken(): string | '' {
        return localStorage.getItem("access_token");
    }

    getRefreshToken(): string | '' {
        return localStorage.getItem("refresh_token");
    }

    clearTokens(): void {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    getCurrentUser(): Observable<any> { 
        const accessToken = this.getAccessToken(); 
        if(!accessToken) { 
            console.error('No access token found'); 
            return throwError(() => new Error("User not authenticated")); 
        }
        return this.httpClient.get(this.getAllUsersURL, {headers: new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`
        })}); 
    }
    
}



