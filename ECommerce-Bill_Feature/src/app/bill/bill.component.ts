import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrderAPIService } from '../order-api.service';
import { OrderServiceService } from '../order-service.service';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})

export class BillComponent implements OnInit {
  flag_get:boolean=false;
  flag_show:boolean=false;
  flag_rp:boolean=false;
  PM:string="COD"
  orders: any;
  userAddress:any;
  oItems:any;
  GrandTotal:number=0;
  useridofloggeduser: string;
  datas: any;
  selectedCategory: string;
  products2:any[]=[];
  products:any;
 
  constructor(private service:OrderAPIService,private shopService: ShopService,private serv:OrderServiceService,private route:Router,private service1:CartService) { }
 public showBill(id:any,oid:any)
  {
    console.log(id)
    let resp=this.service.getAddByID(id);
    resp.subscribe(data=>{
      this.userAddress=data;

     console.log(this.userAddress)
     
    });
let oiresp=this.service.getOItemsByID(oid);
oiresp.subscribe(data=>{
  this.GrandTotal=0;
  this.oItems=data;
  
  this.oItems.forEach(element => {
    this.GrandTotal=element.subTotal+this.GrandTotal
    });

  console.log(this.oItems)});
  this.flag_get=true;
  
  }

  public MyOrders()
  {
this.serv.goToOrders()
  }
  public closeNow()
  {
    this.flag_show=false;

  }
  public showOrderDetails()
  {
    this.flag_show=true;
    let resp=this.service.getOrdersByID(parseInt(sessionStorage.getItem("UserId")));
    resp.subscribe(data=>{
      this.orders=data;
      this.showBill(this.orders.deliveryAddress,this.orders.orderId)
    });
 
}

AddProdtoCart(ProductId:number):void{
  if(sessionStorage.getItem("UserId")!=undefined){
  this.useridofloggeduser=sessionStorage.getItem("UserId");
  this.service1.AddCart(ProductId,Number(this.useridofloggeduser)).subscribe(data=>{
    console.log(data);
    this.datas=data.result;
    })
}

else{
  this.route.navigateByUrl("login");
}
}
getProducts() {
  this.shopService.getProducts().subscribe(response => {
    this.products = response;

    this.products2=this.products.slice(-5,-1);
    console.log(this.products2);
  })
}


  ngOnInit(): void {
    if(sessionStorage.getItem("UserId")!=undefined){
    this.getProducts()
    
  }
  else{
    this.route.navigateByUrl("login")
  }
  
  }


  
}