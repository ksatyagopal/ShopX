import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../Address';
import { CartService } from '../cart.service';
import { OrderAPIService } from '../order-api.service';
import { OrderServiceService } from '../order-service.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {


  public myaddress: Address={
    addressLine1: "" ,
        addressLine2: "",
        city :  "" ,
        postalCode :  "" ,
        country :  "" ,
        mobile :  "" ,
        mailId :  "" ,
        contactPerson :  "",
        userId:0
      };
      public response:string="";
  
  constructor(private ser:OrderAPIService,private service:CartService,private route:Router) { }
  //private service!: OrderServiceService;
  message: string="";
  display="none";

  userId:number=parseInt(sessionStorage.getItem("UserId"));
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    this.route.navigateByUrl("bill");
  }
  public goToOrders(){
    console.log(this.myaddress)
    let resp=this.ser.addAddress(this.myaddress,this.userId);
    resp.subscribe(data=>{
      console.log(data.toString())
    this.message=data.toString();
this.ser.message=this.message;
      });
    
  this.ser.goToBill();
  this.service.isAdd=false;
   
  }
 

  ngOnInit(): void {
    if(this.service.isAdd)
    {
      this.ngOnInit()
    }
else{
this.route.navigateByUrl("Cart")
}
  }

}
