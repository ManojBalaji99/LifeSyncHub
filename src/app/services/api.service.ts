import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private getMomentSubject = new Subject<void>();

  private getToDoListSubject = new Subject<void>();

  getMomentFunctionCalled$ = this.getMomentSubject.asObservable();

  getToDoListFunctionCalled$ = this.getToDoListSubject.asObservable();

  callgetMomentFunction() {
    this.getMomentSubject.next();
  }

  callgetTodolistFunction() {
    this.getToDoListSubject.next();
  }


  constructor(private http: HttpClient) { }
  

  // moments
  getMoments(params?: any, emo?: any) {
    
    let url = `http://localhost:3200/api/getMoments`
    if (params) {
      url+= `?${params}`
    }
    if (emo) {
      url += `&selectedEmotions=${emo}`
    }
    console.log(url)
    return (this.http.get(url))

  }


  postMoments(body: any) {
    return this.http.post("http://localhost:3200/api/postMoments", body)
  }

  updateMoments(body: any) {
    return this.http.put("http://localhost:3200/api/updateMoments", body)
  }

  deleteMoments(body:any){
    console.log(body)
    return this.http.put("http://localhost:3200/api/deleteMoments",body)
  }

  getTodolist() {
    let url = "http://localhost:3200/api/getTodolist";
    return this.http.get(url);
  }

  updateToDoListStatus(body : any) {
   
    let url = "http://localhost:3200/api/updateToDoListStatus"
    return this.http.put(url,body)
  }

  deleteToDo(body : any) {
    
    let url = "http://localhost:3200/api/deleteToDo"
    return this.http.put(url,body)
  }


}
