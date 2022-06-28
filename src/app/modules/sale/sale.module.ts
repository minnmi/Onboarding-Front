import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaleRoutingModule} from './sale-routing.module';
import {SaleRegisterComponent} from './sale-register/sale-register.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    SaleRegisterComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    CoreModule
  ]
})
export class SaleModule {
}
