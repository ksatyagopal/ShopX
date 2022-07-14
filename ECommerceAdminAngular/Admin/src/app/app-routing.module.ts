import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminslistComponent } from './adminslist/adminslist.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ChangesComponent } from './changes/changes.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductstorageComponent } from './productstorage/productstorage.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [ 
  {path:'customers',component:CustomersComponent},
{path:'orders',component:OrdersComponent},
{path:'adminslist', component:AdminslistComponent},
{path:'register', component:RegisterComponent},
{path:'products', component:ProductsComponent},
{path:'changes', component:ChangesComponent},{path:'storages', component:ProductstorageComponent},{path:'analysis', component:AnalysisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
