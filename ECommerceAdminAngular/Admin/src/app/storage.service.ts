import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductStorage } from 'Models/ProductStorage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http:HttpClient) { }
  req:string="https://localhost:44346/api/Storages";
  
  getAllStorages():Observable<ProductStorage[]>
  {
    return this.http.get<ProductStorage[]>(this.req);
  }

  getstoragebyname(name:any):Observable<ProductStorage[]>
  {
    return this.http.get<ProductStorage[]>(this.req+"/StorageName"+name,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
  updatestoragedetails(storage:ProductStorage):Observable<any>
  {
      return this.http.put<any>(this.req+"/"+storage.storageId,storage,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
  deletestorage(id:number):Observable<any>
  {
    return this.http.delete<any>(this.req+"/"+id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
}
