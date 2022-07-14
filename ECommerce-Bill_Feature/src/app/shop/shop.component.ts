import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products:any;
  products2:any[]=[];
  selectedCategory:string;
  allcategories:any;
  term: string;
  totalCount:number;
  sortOptions= [
    {name: 'Relevance'},
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ]
  
  constructor(private shopService: ShopService) { 
    
    
  }

  ngOnInit(): void {
    this.getProducts();
    this.getAllCategories();
    
  }

  getProducts() {
    this.shopService.getProducts().subscribe(response => {
      this.products = response;

      this.products2=this.products
      this.totalCount=this.products2.filter(x=>x).length
      // this.products.forEach(element => {
      //   console.log(element);
      //   this.products2.push(element);
        
      // });
    })
  }
  
  getAllCategories()
  {
    this.shopService.getCategory().subscribe(response=>{
      this.allcategories=response;
      this.allcategories.unshift('All');
    

      console.log(this.allcategories)
    })
  }

  FilterByCategory(demo:string)
  {
    if(demo=='All')
    {
      this.products2=this.products;
      this.totalCount=this.products2.filter(x=>x).length
    }
    else
    {
this.selectedCategory=demo;
this.products2=[];
this.products.forEach(element =>
{
  if(element.category==this.selectedCategory)
    {
      this.products2.push(element);
      console.log(this.products2);
    }
}
);
//To get the number of Products on the Display Page
this.totalCount=this.products2.filter(x=>x).length
}

  }
  onSearch(){
  }
  onReset(){}
  onSortSelected(sort: string) {
    // console.log(this.products2)
    // this.products2.sort((a,b) => a.productName - b.productName);
    // console.log(this.products2)
    //this.shopParams.sort = sort;
    //this.getProducts();
    console.log(sort)
    if(sort=="name")
    {
    this.products2.sort((a,b) => a.productName.localeCompare(b.productName));
    }
    else
    if(sort=="priceAsc")
    {
      this.products2.sort((a,b) => a.price - b.price)
      //this.products2.sort((a,b) => a.price.localeCompare(b.price,undefined,{'numeric': true}));
    }
    else
    {
      this.products2.sort((a,b) => b.price - a.price)
      //this.products2.sort((a,b) => b.price.localeCompare(a.price,{'numeric': true}));
    }
  }

}
