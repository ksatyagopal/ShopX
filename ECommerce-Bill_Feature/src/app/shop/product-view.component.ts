import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
productsdisplay:any;
datas:any;
display="none";
useridofloggeduser:any;

  constructor(private route: ActivatedRoute,private service:ShopService,private ser:CartService,private router:Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.service.GetProductById(id).subscribe((data)=>{
      this.productsdisplay=data;
      
    });
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  AddProdtoCart(ProductId:number):void{
    if(sessionStorage.getItem("UserId")!=undefined){
      this.useridofloggeduser=sessionStorage.getItem("UserId");
    this.ser.AddCart(ProductId,this.useridofloggeduser).subscribe(data=>{
      console.log(data);
      this.datas=data.result;
      })
  }
  else{
    this.router.navigateByUrl("login");
  }

}
}
