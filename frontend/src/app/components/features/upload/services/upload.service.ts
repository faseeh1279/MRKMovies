import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private httpClient = inject(HttpClient); 
  private uploadMovieURL = "http://127.0.0.1:1234/movies/detail-list/"; 

  
  
  
  uploadMovie = (data:any) => { 
    return this.httpClient.post(this.uploadMovieURL, data); 
  }
  

}
