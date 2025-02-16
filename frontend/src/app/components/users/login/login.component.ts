import { Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from "@angular/forms"; 
import { AuthService } from '../service/auth.service';
import { type loginData as loginDataInterface} from '../model/auth.model';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  private authService = inject(AuthService); 
  private destroyRef = inject(DestroyRef); 
  private router = inject(Router); 
  public loadingScreen: boolean = false; 
  
  loginForm = new FormGroup({ 
    username: new FormControl('', {nonNullable: true,validators: [Validators.required]}), 
    password: new FormControl('', {nonNullable: true,validators: [Validators.required, Validators.minLength(6)]})
  }); 
  
  
  onSubmit = () => { 
    this.loadingScreen = true; 
    const enteredUsername = this.loginForm.value.username; 
    const enteredPassword = this.loginForm.value.password; 

    
    const loginData : loginDataInterface = { 
      username: <string>enteredUsername, // Used to convert into string
      password: <string>enteredPassword, // Used to convert into string
    }
    
    
    const subscription = this.authService.loginData(loginData).subscribe({ 
      next: (result) => { 
        this.router.navigate(['/home']); 
        this.loadingScreen = false; 
      }, 
      error: (error) => { 
        console.error(error); 
        this.loadingScreen = false; 
      }
    }); 

    this.destroyRef.onDestroy(() => { 
      subscription.unsubscribe(); 
    })
    
  }
}
