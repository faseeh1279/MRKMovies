import { Component, inject, OnInit } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { SearchBoxComponent } from "../forms/search-box/search-box.component";
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, SearchBoxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private homeService = inject(HomeService); 
  getData = () => { 
    this.homeService.fetchData().subscribe({ 
      next: (result) =>{ 
        console.log(result); 
      }
    })
  }
  ngOnInit(): void {
    this.getData(); 
  }
}
