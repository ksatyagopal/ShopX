import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class User1Service {
  url: string = "https://localhost:44325/api/Users/";
  isLoggedIn:boolean = false;
  User:User;
  constructor(private http:HttpClient , private route:Router) { }
  
  redirectDashboard():void{
    this.route.navigateByUrl("");
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(catchError(this.handleError));
  }
  getUserName(id:any): Observable<any> {
    return this.http.get<any>(this.url+"GetUsername/" +id);
  }
  getUserById(id:any): Observable<User> {
    return this.http.get<User>(this.url + id).pipe(catchError(this.handleError));
  }

  updateUser(a: User): Observable<any> {
    return this.http.put<any>(this.url + a.userId, a, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    }).pipe(catchError(this.handleError));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.url + id).pipe(catchError(this.handleError));
  }


  pushUser(User:User):any{
    console.log("PushUser called in service");
    return this.http.post<User>(this.url, User, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    }).pipe(catchError(this.handleError));
  }

  checkCredentials(mail:string, pwd:string): Observable<string> {
    return this.http.get(this.url + mail + "/" + pwd, {responseType:'text'}).pipe(catchError(this.handleError));
  }

  checkUserAndSendOTP(mail:string): Observable<string> {
    return this.http.get(this.url + "ForgotPassword/" + mail, {responseType:'text'}).pipe(catchError(this.handleError));
  }

  changePassword(mail:string,pwd:string):any{
    console.log("change password called");
    return this.http.get(this.url + "changeP/"+ mail + "/" + pwd).pipe(catchError(this.handleError));
  }
  

  private handleError(error: HttpErrorResponse){
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:',error.status, error.statusText);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        'Backend returned code ${error.status}, body was: ',error.status);
    }
    sessionStorage.setItem("response", "serverdown");
    sessionStorage.setItem("show", "1");
    // location.reload();
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  logout(id:string):Observable<string> {
    console.log("Logout called in User service");
    console.log(this.url +"Logout/"+ id);
    return this.http.get(this.url + "Logout/"+ id,{responseType:'text'}).pipe(catchError(this.handleError));
  }
  
}

