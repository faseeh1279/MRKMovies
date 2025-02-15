import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  private httpClient = inject(HttpClient); 
  private destroyRef = inject(DestroyRef); 
  ngOnInit(): void {
    const subscription = this.httpClient.get('https://randomuser.me/api?results=20').subscribe({
      next: (result) => { 
        console.log(result); 
      }
    }); 
    this.destroyRef.onDestroy(() => { 
      subscription.unsubscribe(); 
    })
  }
}
