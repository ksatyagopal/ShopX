import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseurl="https://localhost:44346/api/";
  constructor(private http:HttpClient,private route:Router) { }
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
    // sessionStorage.clear();
    sessionStorage.setItem("response", "serverdown");
    sessionStorage.setItem("show", "1");
    // location.reload();
    
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getProducts(){
    return this.http.get(this.baseurl+'Products').pipe(catchError(this.handleError));
    
  }

  getCategory()
  {
    return this.http.get(this.baseurl+'Products/GetAllCategory').pipe(catchError(this.handleError));
  }

  GetProductById(id:any){
    return this.http.get(this.baseurl+'Products/'+id).pipe(catchError(this.handleError));
  }
  
}
