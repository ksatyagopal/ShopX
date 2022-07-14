import { Component, OnInit } from '@angular/core';
import { OrderAPIService } from '../order-api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private ser:OrderAPIService) { }

  ngOnInit():void{
    
  }

}
