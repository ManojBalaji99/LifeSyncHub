import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  

  // moments
  getMoments(params: any, emo?: any) {
    
    let url = `http://localhost:3200/api/getMoments?${params}`
    if (emo) {
      url += `&selectedEmotions=${emo}`
    }
    console.log(url)
    return (this.http.get(url))

  }


  postMoments(body: any) {
    return this.http.post("http://localhost:3200/api/postMoments",body)
  }
}
