import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  basket$:any;
  currentUser:any;
  constructor(private service:CartService,private route:Router,private userserv:UserService) { }
  datas:any;
  GrandTotal:number=0;
  loggedInUser:boolean=false;
  show:boolean=false;
  ngOnInit(): void {
    console.log("checking nav bar reload");
    if(sessionStorage.getItem("response")=="serverdown"){
      this.show=true;
      sessionStorage.clear();
    }
   else{
    if(sessionStorage.getItem("UserId")!=undefined){
      this.loggedInUser=false;
      this.userserv.getUserById(sessionStorage.getItem("UserId")).subscribe(data=>{this.currentUser=data.firstName});
      
    }
    else{
      this.loggedInUser=true;
    }
   }
  }
  closeToast(){
    this.show=false;
    
  }
  logout():void{
    console.log(sessionStorage.getItem("UserId"));
    console.log("logout called");
    this.userserv.logout(sessionStorage.getItem("UserId")).subscribe();
    sessionStorage.clear();
    location.reload();
  }

  
}

