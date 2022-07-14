import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ProductItemComponent } from './product-item.component';
import { ProductViewComponent } from './product-view.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductViewComponent
  ],
  imports: [
    Ng2SearchPipeModule,
    FormsModule,
    CommonModule, SharedModule,
  ], exports: [ShopComponent,ProductItemComponent]
})
export class ShopModule { }
