import { Component, OnInit } from '@angular/core';
import { Admin } from 'Models/Admin';
import { Contribution } from 'Models/Contribution';
import { AdminService } from '../admin.service';
import { ChangesService } from '../changes.service';

@Component({
  selector: 'app-adminslist',
  templateUrl: './adminslist.component.html',
  styleUrls: ['./adminslist.component.css']
})
export class AdminslistComponent implements OnInit {
  admins:Admin[]=[];
  showAdmin = false;
  editAdmin = false;
  selectedAdmin:Admin;
  changes:Contribution = new Contribution();
  previousstate = "";
  changedstate = "";
  reason = "";
  constructor(public server:AdminService, private contribute:ChangesService) { }

  ngOnInit(): void {
    this.adminList();
  }

  showAdminDetails(ad:Admin):any{
    this.selectedAdmin = ad;
    this.showAdmin = true;
  }

  editAdminDetails(ad:Admin):any{
    this.previousstate = ad.email+","+
                          ad.mobile+
                          ",isSuper:"+ad.isSuperAdmin+
                          ",isLocked:"+ad.isLocked+
                          ",isDeleted:"+ad.isDeleted;
    this.selectedAdmin = Object.assign({}, ad);
    this.editAdmin = true;
  }

  close():any{
    this.showAdmin = false;
    this.editAdmin = false;
  }

  adminList():any{
    this.server.getAdmins().subscribe(response=>{
      response.forEach(value=>{
        if(value.adminId != this.server.admin.adminId){
          this.admins.push(value);
        }
      });
    })
  }

  changeAdminDetails():any{
    this.changes.changeMadeBy = this.server.admin.adminId;
    this.changedstate = this.selectedAdmin.email+","+
                               this.selectedAdmin.mobile+
                               ",isSuper:"+this.selectedAdmin.isSuperAdmin+
                               ",isLocked:"+this.selectedAdmin.isLocked+
                               ",isDeleted:"+this.selectedAdmin.isDeleted;
    this.changes.changesMade = this.previousstate+"-"+this.changedstate;
    this.changes.reason = this.reason;
    this.changes.reference = this.selectedAdmin.adminId.toString();
    this.server.updateAdmin(this.selectedAdmin).subscribe();
    this.contribute.pushChange(this.changes).subscribe();
    location.reload();
  }


}
