import { Component, OnInit } from '@angular/core';
import { Contribution } from 'Models/Contribution';
import { AdminService } from '../admin.service';
import { ChangesService } from '../changes.service';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent implements OnInit {
  contributions:Contribution[] = [];
  constructor(public contribute:ChangesService,public server:AdminService) { 

  }

  ngOnInit(): void {
    this.getContributions();
  }

  getContributions():any{
    this.contribute.getChanges().subscribe(response=>{
      this.contributions = response;
    });
  }

}
