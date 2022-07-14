import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http:HttpClient){}
  ngOnInit(): void {
  //  this.http.get("https://localhost:44331/api/Products").subscribe((response:any)=>{
  //  this.products=response
  //  console.log(response)}
  //  );
  }
  title = 'client';
}
