import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private dataBaseUrl: string;
  private resposeData: any;


  constructor(private httpClient: HttpClient) {
    this.dataBaseUrl = 'http://localhost:3000'

  }

  private updatingHeaderComponent = new Subject<any>(); //need to create a subject

  sendLoginUpdateToHeader() { //the component that wants to update something, calls this fn
    this.updatingHeaderComponent.next(); //as this subjectName is used in bellow function so it will be called from header autometicaly
  }

  getLoginUpdateForHeader(): Observable<any> { //the receiver component calls this function 
    return this.updatingHeaderComponent.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  public loginUser(userEmail: string): Observable<any> {

    return this.httpClient.get<any>(this.dataBaseUrl + '/users?id=' + userEmail);
  }

  public signupUser(userForSignup: any): Observable<any> {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(userForSignup)
    console.log(body)

    return this.httpClient.post<any>(this.dataBaseUrl + '/users', body, { 'headers': headers })
     

    // return this.httpClient.post<any>(
    //   this.dataBaseUrl +
    //   "/users" ,

    //   { "userName" : "password" }

    //   );
  }


}
