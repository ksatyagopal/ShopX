import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Address } from './Address';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from './Product';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OrderAPIService {
  
  constructor(private http:HttpClient,private router:Router) { }
  
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
  public getOrders(id:number){
    return this.http.get("https://localhost:44346/Orders/"+id);
  }
  public message:any;
  
  public getitems(id:Number):Observable<Product>{
    return this.http.get<Product>("https://localhost:44346/OrderItems/"+id).pipe(catchError(this.handleError));
  }
  public deleteitem(oid:Number,PdtId:string):any{
    console.log("https://localhost:44346/OrderItems/"+oid+"/ProductId"+PdtId);
    

    this.http.delete("https://localhost:44346/OrderItems/"+oid+"/ProductId"+PdtId);
    
  }

  public getimages(id:number){
    return this.http.get("https://localhost:44346/Products/"+id).pipe(catchError(this.handleError));
  }

  // public addAddress(product: Address,uid:number){
  //   return this.http.post("https://localhost:44346/Orders",product,{responseType:'text' as 'json'});
  //  }
  public getaddress(id:number){
    return this.http.get("https://localhost:44346/UserAddresses/"+id).pipe(catchError(this.handleError));
   }
  
  public addAddress(add: Address,uid:number){
    add.userId=uid;
    return this.http.post("https://localhost:44346/Orders",add,{responseType:'text' as 'json'}).pipe(catchError(this.handleError));
   }
   goToBill(){
    console.log("Bill");
    // this.router.navigate(['/','bill']);
  }
 // http://localhost:44346/Orders/GetById?id=1000

 public getOrdersByID(id:number)
 {
  return this.http.get("https://localhost:44346/Orders/GetById?id="+id).pipe(catchError(this.handleError));
  
 }
 public getAddByID(id:number)
 {
  return this.http.get("https://localhost:44346/Orders/GetUserAdd?uid="+id).pipe(catchError(this.handleError));
  
 }
 
 public getOItemsByID(id:number)
 {
  return this.http.get("https://localhost:44346/Orders/GetOrderItems?oid="+id).pipe(catchError(this.handleError));
  
 }
 
}