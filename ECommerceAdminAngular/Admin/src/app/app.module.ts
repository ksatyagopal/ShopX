import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminslistComponent } from './adminslist/adminslist.component';
import { ProductsComponent } from './products/products.component';
import { ChangesComponent } from './changes/changes.component';
import { ProductstorageComponent } from './productstorage/productstorage.component';
import { AnalysisComponent } from './analysis/analysis.component';
import * as CanvasJSAngularChart from '../assets/charts/canvasjs.angular.component';
import { ChartsComponent } from './charts/charts.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    CustomersComponent,
    OrdersComponent,
    LoginComponent,
    RegisterComponent,
    AdminslistComponent,
    ProductsComponent,
    ChangesComponent,
    ProductstorageComponent,
    AnalysisComponent,CanvasJSChart, ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
