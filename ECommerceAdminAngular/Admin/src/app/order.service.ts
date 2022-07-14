import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'Models/Admin';
import { Order } from 'Models/Order';
import { OrderItem } from 'Models/OrderItem';
import { catchError, Observable, throwError } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string = "https://localhost:44346/api/Order/";
  orderitemsurl: string = "https://localhost:44346/api/OrderItem/";
  
  constructor(private http:HttpClient,private userServ:AdminService) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url).pipe(catchError(this.handleError));
  }

  getOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.orderitemsurl).pipe(catchError(this.handleError));
  }

  getOrderById(id:any): Observable<Order> {
    return this.http.get<Order>(this.url + id).pipe(catchError(this.handleError));
  }

  updateOrder(order: Order): Observable<any> {
    return this.http.put<any>(this.url + order.orderId, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    }).pipe(catchError(this.handleError));
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(this.url + id).pipe(catchError(this.handleError));
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
    this.userServ.logout(sessionStorage.getItem("adminId")).subscribe();
    sessionStorage.setItem("response", "serverdown");
    sessionStorage.setItem("show", "1");
    location.reload();
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
