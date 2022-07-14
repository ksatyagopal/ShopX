import { Component, OnInit } from '@angular/core';
import { Order } from 'Models/Order';
import { OrderItem } from 'Models/OrderItem';
import { Product } from 'Models/Product';
import { User } from 'Models/User';
import { UserAddress } from 'Models/UserAddress';
import { CustomerService } from '../customer.service';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  allOrders:Order[] = [];
  allOrderItems:OrderItem[] = [];
  allProducts:Product[] = [];
  allUsers:User[] = [];
  allUserAddresses:UserAddress[] = [];
  showOrder:boolean = false;
  editOrder:boolean = false;
  order:Order = new Order();
  selectedUser: User;
  selectedUserAddress: UserAddress;
  selectedOrderItems: OrderItem[] = [];
  selectedProducts: Product[] = [];
  constructor(private orderService: OrderService,private prodService:ProductService,private custService:CustomerService) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.getAllOrderItems();
    this.getAllUsers();
    this.getAllUserAddresses();
    this.getAllProducts();
  }

  getAllOrders(){
    this.orderService.getOrders().subscribe(response=>{
      console.log(response);
      this.allOrders = response
      console.log(this.allOrders);
    });
  }

  getAllOrderItems(){
    this.orderService.getOrderItems().subscribe(response=>{
      this.allOrderItems = response;
    });
  }
  
  getAllProducts(){
    this.prodService.getAllProducts().subscribe(response=>{
      this.allProducts = response;
    });
  }

  getAllUsers(){
    this.custService.getAllCustomers().subscribe(response=>{
      this.allUsers = response;
    });
  }
  
  getAllUserAddresses(){
    this.custService.getAllCustomersAddresses().subscribe(response=>{
      this.allUserAddresses = response;
    });
  }

  showOrderDetails(od:Order):any{
    this.order = od;
    this.order.user = this.allUsers.find(u=>u.userId==od.userId);
    this.order.deliveryAddressNavigation = this.allUserAddresses.find(u=>u.id == od.deliveryAddress);
    console.log(od);
    console.log(this.selectedUserAddress);
    this.selectedOrderItems =[];
    this.allOrderItems.forEach(item => {
      if(item.orderId == od.orderId){
        item.product =this.allProducts.find(p=>p.productId == item.productId);
        this.selectedOrderItems.push(item);
        console.log(item);
      }
    });
    this.order.orderItems = this.selectedOrderItems;
    console.log(this.order.orderItems)
    this.showOrder = true;
  }
  
  showEditOrder(ad:Order):any{
    this.editOrder = true;
  }

  close():any{
    this.showOrder = false;
    this.editOrder = false;
  }
}
