import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../storage.service';
import { ProductStorage } from 'Models/ProductStorage';
import { SupplierService } from '../supplier.service';
import { Supplier } from 'Models/Supplier';
import { ProductService } from '../product.service';
import { Product } from 'Models/Product';
import { Sample } from 'Models/Sample';
import { forkJoin, sample } from 'rxjs';

@Component({
  selector: 'app-productstorage',
  templateUrl: './productstorage.component.html',
  styleUrls: ['./productstorage.component.css']
})
export class ProductstorageComponent implements OnInit {
productstorage:ProductStorage[]=[];
uniquestoragename:ProductStorage[]=[];
bystoragename:ProductStorage[]=[];
storagenameselected:any=false;
selectedname:string="";
loopingstorage:Sample={storageId:0,productName:"",productimage:"",supplierName:"",quantity:0};
products:Product;
suppliers:Supplier;
StorageInfo:any=false;
listbysuppliername:Supplier[]=[];
updatedsuppliername:string="";
sessionsupplier:Supplier[]=[];
emptyproduct:Product=new Product;
emptysupplier:Supplier=new Supplier;
sessionproductstorage:ProductStorage={storageId: 0,storageName: "",supplierId:0,productId:0,quantity:0,product: this.emptyproduct,supplier: this.emptysupplier};
sessionquantity:number;
  constructor(private storageobj:StorageService,private supplierobj:SupplierService,private productobj:ProductService) { }

  ngOnInit(): void {
    this.get_storages();
  }
  get_storages():void
  {
    this.storageobj.getAllStorages().subscribe(data=>{
      this.productstorage=data;
      this.get_uniquestoragename();
      this.getsuppliername();
    });
  }
  get_uniquestoragename():void{
    this.uniquestoragename=this.productstorage.filter(
      (str, i, arr) => arr.findIndex(t => t.storageName === str.storageName) === i);  
     
  }
  getproductfromstorage():void{
    this.storageobj.getstoragebyname(this.selectedname).subscribe(data=>{
      this.bystoragename=data;
    });
    this.storagenameselected=true; 
   }

   showmoredetails(p:ProductStorage):void{
    this.sessionproductstorage=p;
    forkJoin([this.supplierobj.getsupplierbyid(p.supplierId), this.productobj.getProductsByID(p.productId)])
    .subscribe(([res1, res2]) => {
    this.suppliers = res1;
    this.products = res2;
    console.log(this.products,this.suppliers);
    
  })
    this.loopingstorage.productName=this.products.productName;
    this.loopingstorage.productimage=this.products.imageUrl;
    this.loopingstorage.supplierName=this.suppliers.supplierName;
    this.loopingstorage.storageId=p.storageId;
    this.loopingstorage.quantity=p.quantity;
    this.StorageInfo=true;
   }
   close():void{
    this.StorageInfo=false;
   }
   getsuppliername():void{
    this.supplierobj.getAllSuppliers().subscribe((res: Supplier[])=>this.listbysuppliername=res);
   }
   updatestoragedetails(id:any):void{
    this.sessionsupplier=this.listbysuppliername.filter((res)=>res.supplierName.toLocaleLowerCase()==this.updatedsuppliername.toLocaleLowerCase());
    this.sessionproductstorage.supplierId=this.sessionsupplier[0].supplierId;
      if(this.loopingstorage.supplierName != this.updatedsuppliername && this.sessionproductstorage.quantity != this.loopingstorage.quantity){
        this.sessionproductstorage.quantity=this.loopingstorage.quantity;
        this.storageobj.updatestoragedetails(this.sessionproductstorage).subscribe();    
        console.log(this.sessionproductstorage.quantity,this.sessionproductstorage.supplierId);
      }
      else if (((this.loopingstorage.supplierName == this.updatedsuppliername) || (this.updatedsuppliername="")) && this.sessionproductstorage.quantity != this.loopingstorage.quantity){
        this.sessionproductstorage.quantity=this.loopingstorage.quantity;
        console.log(this.sessionsupplier[0].supplierId);
        this.storageobj.updatestoragedetails(this.sessionproductstorage).subscribe();
        console.log(this.sessionproductstorage.quantity);
      }
      else{
        console.log(this.updatedsuppliername);
        this.storageobj.updatestoragedetails(this.sessionproductstorage).subscribe();
        console.log(this.sessionproductstorage.supplierId);
      }
      this.StorageInfo=false;
   }
   deletestorage(id:any):void{
    let ans=confirm("The selected storage with the ID will be deleted. Are you sure to proceed?");
    if(ans){
      this.storageobj.deletestorage(id).subscribe();
      this.StorageInfo=false;
    }
   else{
    this.StorageInfo=false;
   }
   }
}
