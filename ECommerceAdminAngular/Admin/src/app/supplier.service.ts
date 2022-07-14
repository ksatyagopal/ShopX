import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from 'Models/Supplier';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }
  req:string="https://localhost:44346/api/Suppliers";
  
  getsupplierbyid(id:any):Observable<Supplier>
  {
    return this.http.get<Supplier>(this.req+"/"+id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
  getAllSuppliers():Observable<Supplier[]>
  {
    return this.http.get<Supplier[]>(this.req);
  }
  updatesupplierdetails(supplier:Supplier):Observable<any>
  {
      return this.http.put<any>(this.req+"/"+supplier.supplierId,supplier,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
}
