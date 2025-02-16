import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'frontend';
  showHeaderFooter: boolean = true; 
  
  constructor(private router: Router) { 
    this.router.events.subscribe(() => { 
      if (this.router.url === '/login' || this.router.url == '/register') { 
        this.showHeaderFooter = false; 
      }
      else { 
        this.showHeaderFooter = true; 
      }
    })
  }
}
