import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mailid:any;
  password:any;
  loginResponse:string = "";
  show = false;
  readotp = false;
  forgotpassword = false;
  changepassword = false;
  fmailid:string;
  fpassword:string;
  cfp:string;
  otp:string;
  otpEntered:string;
  constructor(private server:UserService, private route:Router) { }
  

  ngOnInit(): void {
    console.log(sessionStorage.getItem("response"));
    if(sessionStorage.getItem("UserId")!=undefined){
      this.redirectDashboard();

    }
    if(sessionStorage.getItem("show")=="1"){
      this.show = true;
      
    }
    else{
      this.show = false;
    }
    if(sessionStorage.getItem("response")!=undefined){
      this.loginResponse = sessionStorage.getItem("response");
    }
  }

  validateUser():any{
    console.log("ValidateUser called, passed", this.mailid, this.password)
    this.server.checkCredentials(this.mailid, this.password).subscribe(response=>{
      this.loginResponse=response;
      console.log(this.loginResponse);
      
       if(this.loginResponse.length == 4){
        console.log("Valid credentials");
        this.server.isLoggedIn = true;
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("UserId", this.loginResponse);
        location.reload();
      }
      else{
        sessionStorage.setItem("show","1");
        sessionStorage.setItem("response",this.loginResponse);
        location.reload();
      }
     
    });
  }

  redirectDashboard():void{
    console.log(sessionStorage.getItem("UserId"))
    if(sessionStorage.getItem("UserId")!=undefined){
      this.route.navigateByUrl("Home");
    }
  }
  closeToast(){
    sessionStorage.setItem("show", "0");
    location.reload();
  }

  showForgotPasswordPage(){
    this.forgotpassword=true;
  }

  sendotp(){
    this.server.checkUserAndSendOTP(this.fmailid).subscribe(res=>{
      console.log("send otp called otp sent to", this.fmailid, "and opt=", res);
      this.otp = res;
      this.readotp = true;
      this.forgotpassword = false;
    });
  }

  validateotp(){
    if(this.otpEntered == this.otp){
      this.changepassword = true;
      this.readotp = false;
    }
    else{
      this.changepassword = false;
      location.reload();
    }
  }

  chPassword(){
    this.server.changePassword(this.fmailid, this.fpassword).subscribe();
    location.reload();
  }

  close(){
    this.forgotpassword = false;
    this.changepassword = false;
    this.readotp = false;
  }

}
