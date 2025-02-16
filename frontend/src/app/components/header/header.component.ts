import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private readonly route = inject(ActivatedRoute); 
  
  ngOnInit(): void {
    console.log(window.location.pathname);
    console.log(this.route.url); 
  }

}
