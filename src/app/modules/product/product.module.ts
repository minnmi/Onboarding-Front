import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductRoutingModule} from './product-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductRegisterComponent} from './product-register/product-register.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    ProductListComponent,
    ProductRegisterComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CoreModule
  ]
})
export class ProductModule {
}
