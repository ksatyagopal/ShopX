import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  getProducts() {
    throw new Error('Method not implemented.');
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
    // sessionStorage.clear();
    sessionStorage.setItem("response", "serverdown");
    sessionStorage.setItem("show", "1");
    // location.reload();
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  constructor(private http:HttpClient) { }
  result:any;
  req="https://localhost:44346/api/Carts"
  public iscart:boolean=false;
  public isAdd:boolean=false;
  public isBill:boolean=false;

  GetcartforUser(userid:any){
    return this.http.get("https://localhost:44346/api/Carts?userId="+userid).pipe(catchError(this.handleError));
  }

  // Getcartcount(userid:any):Observable<any>{
  //   return this.http.get("https://localhost:44346/api/Carts/getcount?userId="+userid);
  // }

  AddCart(ProductId:number,userId:number):Observable<any>
  {
    return this.http.post<any>("https://localhost:44346/api/Carts?Prdid="+ProductId+"&userId="+userId, {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    }
    ).pipe(catchError(this.handleError));
  }
  
  RemoveCartItem(ProductId:number,userId:number):Observable<any>
  {
    return this.http.put<any>("https://localhost:44346/api/Carts/Remove?Prdid="+ProductId+"&userId="+userId, {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    }
    ).pipe(catchError(this.handleError));
  }
}
