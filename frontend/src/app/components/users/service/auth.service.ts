import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
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
    public httpClient = inject(HttpClient);
    



    // Generate token (assuming it's a POST request)
    generateToken = (loginData: loginData): Observable<loginData> => {
        return this.httpClient.post<loginData>(this.tokenURL, loginData);
    }

    // Create HTTP Headers with Authorization Token 
    private getHttpHeaders(tokenData: Token) : HttpHeaders { 
        return new HttpHeaders({ 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${tokenData.access_token}`
        })
    }

    // Login Method 
    loginData(login: loginData) { 
        return this.httpClient.post(this.loginURL, login); 
    }

    registerData(register: registerData) { 
        return this.httpClient.post(this.registerURL, register); 

    }

    // private getHttpHeaders(accessToken: string): HttpHeaders {
    //     console.log(this.accessToken);
    //     return new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`
    //     });
    // }

    // //  Login Method 
    // login(loginData: { username: string, password: string }): Observable<any> {
    //     return this.generateToken().pipe(
    //         tap((result) => this.accessToken = result.token), // Stores token
    //         switchMap(() => this.httpClient.post(
    //             this.loginURL,
    //             loginData,
    //             { headers: this.getHttpHeaders(this.accessToken) }
    //         ))
    //     );
    // }
}
