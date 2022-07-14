import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { Contribution } from 'Models/Contribution';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: string = "https://localhost:44353/api/Admins/";
  isLoggedIn:boolean = false;
  admin:Admin;
  change:Contribution;
  constructor(private http:HttpClient , private route:Router) { }

  redirectDashboard():void{
    this.route.navigateByUrl("");
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.url).pipe(catchError(this.handleError));
  }

  getAdminById(id:any): Observable<Admin> {
    return this.http.get<Admin>(this.url + id).pipe(catchError(this.handleError));
  }

  updateAdmin(a: Admin): Observable<any> {
    return this.http.put<any>(this.url + a.adminId, a, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    }).pipe(catchError(this.handleError));
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete<any>(this.url + id).pipe(catchError(this.handleError));
  }


  pushAdmin(admin:Admin):any{
    return this.http.post<Admin>(this.url, admin, {
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

  checkAdminAndSendOTP(mail:string): Observable<string> {
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

  logout(id:string):any{
    console.log("Logout called in admin service");
    return this.http.head(this.url + id).pipe(catchError(this.handleError));
  }

}
