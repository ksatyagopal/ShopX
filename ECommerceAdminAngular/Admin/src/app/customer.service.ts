import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'Models/User';
import { UserAddress } from 'Models/UserAddress';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  req:string="https://localhost:44346/api/Users";
  getAllCustomers():Observable<User[]>
  {
    return this.http.get<User[]>(this.req);
  }

  getAllCustomersAddresses():Observable<UserAddress[]>{
    return this.http.get<UserAddress[]>("https://localhost:44346/api/UserAddresses/");
  }
}
