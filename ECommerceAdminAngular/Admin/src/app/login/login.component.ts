import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mailid:any;
  password:any;
  loginResponse:string = "";
  unSuccessAttempts = 0;
  show = false;
  readotp = false;
  forgotpassword = false;
  changepassword = false;
  fmailid:string;
  fpassword:string;
  cfp:string;
  otp:string;
  otpEntered:string;
  constructor(private server:AdminService, private route:Router) { }
  

  ngOnInit(): void {
    if(sessionStorage.getItem("show")=="1"){
      this.show = true;
    }
    else{
      this.show = false;
    }
    if(sessionStorage.getItem("response")!=undefined){
      this.loginResponse = sessionStorage.getItem("response");
    }
    if(sessionStorage.getItem("attempts")!=undefined){
      this.unSuccessAttempts = Number.parseInt(sessionStorage.getItem("attempts"), 10);
    }
  }

  validateAdmin():any{
    console.log("ValidateAdmin called, passed", this.mailid, this.password)
    this.server.checkCredentials(this.mailid, this.password).subscribe(response=>{
      this.loginResponse=response;
      console.log(this.loginResponse);
      if(this.loginResponse == "invalid"){
        this.unSuccessAttempts += 1;
      }
      else if(this.loginResponse.length == 5){
        console.log("Valid credentials");
        this.server.isLoggedIn = true;
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("adminId", this.loginResponse);
        sessionStorage.setItem("response", "success");
        sessionStorage.setItem("attempts", "0");
        this.unSuccessAttempts = 0;
      }
      console.log(this.loginResponse, this.unSuccessAttempts);
      sessionStorage.setItem("response", this.loginResponse);
      sessionStorage.setItem("attempts", this.unSuccessAttempts.toString());
      location.reload();
      this.redirectDashboard();
      sessionStorage.setItem("show", "1");
    });
  }

  redirectDashboard():void{
    this.route.navigateByUrl("");
    localStorage.setItem('admindashboard', JSON.stringify(true));
  }

  closeToast(){
    sessionStorage.setItem("show", "0");
    location.reload();
  }

  showForgotPasswordPage(){
    this.forgotpassword=true;
  }

  sendotp(){
    this.server.checkAdminAndSendOTP(this.fmailid).subscribe(res=>{
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
