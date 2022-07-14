import { Component } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShopX Admin';
  response = "";
  isLogged:boolean = false;
  show=false;
  temp:string = "";
  constructor(private server:AdminService){}

  ngOnInit():void{
    this.temp = sessionStorage.getItem("isLoggedIn");
    if(this.temp == "true"){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
    if(sessionStorage.getItem("show")=='1'){
      this.show = true;
    }
    else{
      this.show = false;
    }
    this.response = sessionStorage.getItem("response");
    if(this.response == "serverdown"){
      sessionStorage.clear();
    }
  }

  closeToast(){
    sessionStorage.clear();
    location.reload();
  }
}
