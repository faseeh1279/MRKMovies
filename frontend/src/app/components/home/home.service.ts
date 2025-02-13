import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private httpClient = inject(HttpClient); 
  
  fetchData= ()  => { 
    return this.httpClient.get('http://127.0.0.1:1234/users/list-users/'); 
  }
  
}
