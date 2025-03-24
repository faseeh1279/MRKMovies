import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface UserObj{ 
  username: string; 
  email: string; 
  first_name: string; 
  last_name: string; 
  password: string; 
  date_joined: string; 
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent implements OnInit {
  private httpClient = inject(HttpClient); 
  private destroyRef = inject(DestroyRef);
  private router = inject(Router); 
  userObject!: UserObj; 
  ngOnInit(): void {
    const subscription = this.httpClient.get("http://127.0.0.1:1234/account/users/").subscribe({ 
      next: (data) => { 
        // console.log(data);
        this.userObject = data as UserObj; 
      }, 
      error: (error) => { 
        console.log(error); 
      }
    });  
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe(); 
    }); 
  }
  logout = () => { 
    console.log("Log Out"); 
    localStorage.removeItem("access_token"); 
    localStorage.removeItem("refresh_token"); 
    this.router.navigate(["/users/login"]);

  }
}
