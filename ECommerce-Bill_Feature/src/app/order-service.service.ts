import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from './Address';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private router:Router) { }
  
  goTocart():any{
    this.router.navigate(['/','cart']);
  }
  goToOrders():any{
    this.router.navigate(['/','orders']);
  }
  
}
