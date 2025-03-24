import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { type Token, type loginData, type RegisterData as RegisterDataInterface} from '../models/users.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private httpClient = inject(HttpClient);
    private registerURL = "http://127.0.0.1:1234/account/register/";
    private tokenURL = "http://127.0.0.1:1234/account/api/token/";
    private refreshTokenURL = "http://127.0.0.1:1234/account/api/token/refresh/";

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token'); // Check if a token exists
      }


    // Login Method 
    loginData = (login: loginData): Observable<any> =>{
        return this.httpClient.post(this.tokenURL, login);
    }

    // Register Method `
    registerData = (register: RegisterDataInterface) => {
        return this.httpClient.post(this.registerURL, register);
    }

    // Stores Tokens 
    storeTokens = (tokenData: Token): void => {
        localStorage.setItem("access_token", tokenData.access);
        localStorage.setItem("refresh_token", tokenData.refresh);
    }
    logout = () => { 
        localStorage.setItem("access_token", ''); 
        localStorage.setItem("refresh_token", ''); 

    }
    // Generates New Access Token if the Token expires.
    generateNewAccessToken = (token: string) => {
        return this.httpClient.post<{access:string}>(this.refreshTokenURL, {refresh: token}); 
    }

    

}



