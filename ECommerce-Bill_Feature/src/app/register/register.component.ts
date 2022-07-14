import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = new User();
  newUser:any;
  isSuccess:boolean = false;
  registeredMessage:string;
  display="none";
  constructor(public server:UserService, private route:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("UserId")!=undefined){
      this.route.navigateByUrl("Home");
    }
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    this.route.navigateByUrl("login");
  }
  
  addUser():any{
    this.server.pushUser(this.user).subscribe(response=>{
      this.newUser = response;
      console.log("In addUser function.");
      if(this.newUser==null){
        this.isSuccess = false;
        this.registeredMessage = "Unable to process your request. Adding new User failed.";
      }
      else{
        this.isSuccess=true;
        this.registeredMessage ="Thank you " +this.newUser.firstName+" you are Registered successfully,Please continue to Login.";
        console.log(this.registeredMessage);
      }
    });
  }

 


}
