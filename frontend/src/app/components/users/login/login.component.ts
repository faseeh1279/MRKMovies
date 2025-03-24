import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Token, type loginData as loginDataInterface } from '../models/users.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService); 
  private destroyRef = inject(DestroyRef); 
  private router = inject(Router); 
  formInvalid = signal<boolean>(false); 
  public loadingScreen: boolean = false; 
  responseError!: string; 
  
  loginForm = new FormGroup({ 
    username: new FormControl('', {nonNullable: true,validators: [Validators.required]}), 
    password: new FormControl('', {nonNullable: true,validators: [Validators.required, Validators.minLength(6)]})
  }); 
  
  
  onSubmit = () => { 
    if(this.loginForm.invalid){ 
      this.formInvalid.set(true); 
      setTimeout(() => {
        this.formInvalid.set(false); 
      }, 5000);
      return; 
    }
    else{ 
      this.loadingScreen = true; 
      const enteredUsername = this.loginForm.value.username; 
      const enteredPassword = this.loginForm.value.password;  
  
      const loginData = { 
        username: <string>enteredUsername, 
        password: <string>enteredPassword
      }
  
      this.authService.loginData(loginData).subscribe({ 
        next: (result) => { 
          console.log(result); 
          this.authService.storeTokens(<Token>result); 
          this.router.navigate(['features/home'])
          this.loadingScreen = false; 
        }, 
        error: (err) => { 
          console.error("Error Response: ",err); 
          this.loadingScreen = false; 
          this.responseError = err.error?.detail as string || 'An unknown error occured.'; 
        }
      }); 
      setTimeout(() => {
        this.responseError = ""; 
      }, 5000);
    }
  }
  get usernameControlInvalid(): boolean { 
    const username = this.loginForm.controls.username; 
    return username.invalid && (username.dirty || username.touched);  
  }
  get passwordControlInvalid(): boolean { 
    const password = this.loginForm.controls.password; 
    return password.invalid && (password.dirty || password.touched); 
  }
}
