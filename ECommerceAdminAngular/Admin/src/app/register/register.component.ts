import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'Models/Admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  admin:Admin = new Admin();
  newAdmin:any;
  isSuccess:boolean = false;
  registeredMessage:string;
  constructor(public server:AdminService, private route:Router) { }

  ngOnInit(): void {
  }

  addAdmin():any{
    this.server.pushAdmin(this.admin).subscribe(response=>{
      this.newAdmin = response;
      console.log("In addAdmin function.");
      if(this.newAdmin==null){
        this.isSuccess = false;
        this.registeredMessage = "Unable to process your request. Adding new admin failed.";
      }
      else{
        this.isSuccess=true;
        this.registeredMessage = this.newAdmin.adminName+" created successfully.";
        console.log(this.registeredMessage);
        this.redirectDashboard();
      }
      alert(this.registeredMessage);
    });
  }

  redirectDashboard():void{
    this.route.navigateByUrl("");
  }


}
