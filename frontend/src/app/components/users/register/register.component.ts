import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { type registerData as registerDataInterface} from '../model/auth.model';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public loadingScreen: boolean = false; 
  private authService = inject(AuthService); 
  private router = inject(Router); 

  registerForm = new FormGroup({ 
    username : new FormControl('', {validators: [Validators.required]}), 
    email : new FormControl('', {validators: [Validators.required, Validators.email]}), 
    password : new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
    password2 : new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
  })
  onSubmit = (event: Event) => { 
    event.preventDefault();   
    this.loadingScreen = true; 
    const enteredEmail = this.registerForm.value.email; 
    const enteredUsername = this.registerForm.value.username; 
    const enteredPassword = this.registerForm.value.password; 
    const enteredPassword2 = this.registerForm.value.password2; 

    const registerData: registerDataInterface = { 
      username: <string>enteredUsername, 
      email: <string>enteredEmail, 
      password: <string>enteredPassword, 
      password2: <string>enteredPassword2
    }
     
    this.authService.registerData(registerData).subscribe({ 
      next: (result) =>{ 
        this.loadingScreen = false; 
        this.router.navigate(['/login']); 
      }, 
      error: (error) => { 
        this.loadingScreen = false;
        console.error(error); 
      }
    })

  }
}
