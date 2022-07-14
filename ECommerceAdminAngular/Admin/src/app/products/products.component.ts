import { Component, OnInit } from '@angular/core';
import { Product } from 'Models/Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:Product[]=[];
filteredproducts:Product[]=[];
notactiveproducts:Product[]=[];
others:Array<string>=[];
clothing:Array<string>=[];
image:string[];
producttable:any=false;
searchKey:string="";
value:any;
ischecked:any;
editProducts = false;
selectedproduct:any;
imagename:string="";
activeproducts:any=true;
inactiveproducts:any=false;
addproducts:any=false;
datenow:Date=new Date();
productsbyprice:Product[]=[];
newproduct:Product={productId:0,productName:"",imageUrl:"",price:0,active:"",createdOn:"",modifiedOn:"",pdescription:"",category:"",carts:[],offers:[],orderItems:[],storages:[],ratings:[]};
  constructor(private obj:ProductService) { }

  ngOnInit(): void {
    this.obj.getAllProducts().subscribe(data=>{
      this.filteredproducts=data.filter((product)=>product.active.toLocaleLowerCase()=="yes") ;});
    this.get_products();
  }
  get_products():void
  {
    this.obj.getAllProducts().subscribe(data=>{
      this.products=data.filter((product)=>product.active.toLocaleLowerCase()=="yes");
      if(this.products.length>0){
        this.producttable=true;
      }
    });
  }
  getbyCategory(categoryname:string):void{
    this.obj.getProductsByCategory(categoryname).subscribe(data=>{
      this.products=data;
      console.log(this.products);
    });
  }
  search():void{
    if(this.searchKey!="" && this.searchKey!=" ")
    this.products=this.filteredproducts.filter((product)=>product.productName.toLowerCase().indexOf(this.searchKey.toLocaleLowerCase())!=-1);
    else
    this.products=this.filteredproducts;
  }
  price():void{
    this.obj.getAllProducts().subscribe(data=>{this.products=data;
      this.products=this.products.filter((product)=>(product.price > this.value));
    console.log(this.products);} );
   
  }
  sort():void{
    this.others.push("Vegetables","Fruits","Juices","Electronics");
    this.clothing.push("MenApparels","WomenApparels","Footwear");
    if(this.ischecked){
      this.products=this.filteredproducts.filter((product)=>(this.clothing.includes(product.category)));
      console.log(this.products);
    }
    else{
      this.products=this.filteredproducts.filter((product)=>(this.others.includes(product.category)));
      console.log(this.products);
    }
  }
  showdetails(p:any){
    this.editProducts=true;
    this.selectedproduct=p;
    console.log(this.selectedproduct);
  }

  close():void{
    this.editProducts=false;
    this.addproducts=false;
  }
  updateproductdetails():void{
    this.selectedproduct.modifiedOn=this.datenow.toJSON();
    this.obj.updateproductdetails(this.selectedproduct).subscribe();
    this.close();
    location.reload();
  }
  getimagename():void{
    this.image=this.imagename.split('\\');
    this.selectedproduct.imageUrl=this.image[this.image.length-1];
  }
  showinactiveproducts():void{
    this.activeproducts=false;
    this.obj.getAllProducts().subscribe(data=>this.notactiveproducts=data.filter((product)=>product.active.toLocaleLowerCase()=="no"));
    console.log(this.notactiveproducts);
    this.inactiveproducts=true;
  }
  showactiveproducts():void{
    this.activeproducts=true;
    this.inactiveproducts=false;
  }
  addtoast():void{
    this.addproducts=true;
  }
  addnewproduct():void{
    this.newproduct.imageUrl=this.image[this.image.length-1];
    this.newproduct.createdOn=this.datenow.toJSON();
    this.newproduct.modifiedOn=this.datenow.toJSON();
    this.obj.createnewproduct(this.newproduct).subscribe();
    this.addproducts=false;
    location.reload();
  }
  deleteproduct():void{
    confirm("You're about to delete a product, please confirm ?");
    this.obj.deleteproduct(this.selectedproduct.productId).subscribe();
    location.reload();
  }
}
