import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { Contribution } from 'Models/Contribution';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangesService {
  url: string = "https://localhost:44353/api/Contributions/";
  change:Contribution;
  constructor(private http:HttpClient , private route:Router) { }

  getChanges(): Observable<Contribution[]> {
    return this.http.get<Contribution[]>(this.url);
  }

  pushChange(change:Contribution):any{
    return this.http.post<Contribution>(this.url, change, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    });
  }

}
