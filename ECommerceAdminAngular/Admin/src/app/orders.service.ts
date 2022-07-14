
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'Models/Order';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  getAllorder():Observable<Order[]>
  {
    console.log("https://localhost:44346/api/Order/");
    console.log("IN service");
    return this.http.get<Order[]>("https://localhost:44346/api/Order/");
  }

 
}
