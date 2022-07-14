import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderAPIService } from '../order-api.service';
import { Product } from '../Product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any;
  items: any;
  images:any;
  orderon:string="7/7/2022";
  flag:boolean=false;
  status:string="";
  bordered:string="";
  bshipped:string="";
  bontheway:string="";
  bdelived:string="";
  constructor(private service:OrderAPIService,private route:Router) { }
  

  
  showorders(){
    this.flag=true;
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("UserId")!=undefined){
    let resp=this.service.getOrders(Number(sessionStorage.getItem("UserId")));
    resp.subscribe((data)=>
      this.orders=data);
    }
    else{
      this.route.navigateByUrl("login");
    }
  }
  
  goTo(id:Number,orderStatus:string){
    this.status=orderStatus;
    
    let resp1=this.service.getitems(id);
    resp1.subscribe((data)=>this.items=data);
    let resp2=this.service.getimages(this.items.productId);
    resp2.subscribe((data)=>this.images=data);
    this.flag=true;
    this.color(this.status);
  }
  
  deleteitem(oid:Number,PdtId:any){
    console.log(oid);
    
    console.log("Click hit");
    this.service.deleteitem(oid,PdtId).subscribe((data) => {
    console.log(data)});
    location.reload();
    
  }
color(status:string){
    if(status=='placed'){
      this.bordered='darkgreen';
      this.bdelived='aliceblue';
      this.bontheway='aliceblue';
      this.bshipped='aliceblue';
    }
    if(status=='ontheway'){
      this.bordered='aliceblue';
      this.bdelived='aliceblue';
      this.bontheway='darkgreen';
      this.bshipped='aliceblue';
    }
    if(status=='delivered'){
      this.bordered='aliceblue';
      this.bdelived='darkgreen';
      this.bontheway='aliceblue';
      this.bshipped='aliceblue';
    }
    if(status=='shipped'){
      this.bordered='aliceblue';
      this.bdelived='aliceblue';
      this.bontheway='aliceblue';
      this.bshipped='darkgreen';
    }
  }
}
