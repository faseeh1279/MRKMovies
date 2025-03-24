import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// Everything works as properly as before 
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formError = signal<boolean>(false);
  private authService = inject(AuthService); 
  private router = inject(Router); 
  responseError!:string; 
  registerForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] }),
    password2: new FormControl('', { validators: [Validators.required] }),

  })


  onSubmit = (event: Event) => {
    event.preventDefault();
    if(this.registerForm.invalid){ 
      this.formError.set(true); 
      setTimeout(() => {
        this.formError.set(false); 
      }, 5000);
      return; 
    }
    const modifiedRequest = { 
      username: this.registerForm.controls.username.value, 
      email: this.registerForm.controls.email.value, 
      password: this.registerForm.controls.password.value, 
      password2: this.registerForm.controls.password2.value
    }
    this.authService.registerData(modifiedRequest).subscribe({ 
      next: (result) => { 
        console.log(result); 
        const responseData = result as any; 
        if(responseData?.response === "Registration Successful") { 
          this.router.navigate(['/users/login']); 
        }else { 
          this.responseError = responseData.username; 
        } 
      }, 
      error: (err) =>{ 
        this.responseError = err.error?.detail as string || 'An unknown error occured.';

      }
    }); 
    setTimeout(() => {
      this.responseError = ""; 
    }, 5000);
  }
  get usernameControlInvalid(): boolean {
    const username = this.registerForm.controls.username;
    return username.invalid && (username.dirty || username.touched);
  }

  get emailControlInvalid(): boolean {
    const email = this.registerForm.controls.email;
    return email.invalid && (email.dirty || email.touched);
  }
  get passwordControlInvalid(): boolean {
    const password = this.registerForm.controls.password;
    return password.invalid && (password.dirty || password.touched);
  }
  get password2ControlInvalid(): boolean {
    const password2 = this.registerForm.controls.password2;
    return password2.invalid && (password2.dirty || password2.touched);
  }
}
