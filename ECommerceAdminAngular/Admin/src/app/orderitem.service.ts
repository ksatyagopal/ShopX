
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'Models/Order';
import { OrderItem } from 'Models/OrderItem';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {

  constructor(private http:HttpClient) { }

  getAllorderitems():Observable<OrderItem[]>
  {
    return this.http.get<OrderItem[]>("https://localhost:44346/api/OrderItem/");
  }
  
  
}
