import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportProductRoutingModule} from './report-product-routing.module';
import {ReportProductComponent} from './report-product/report-product.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    ReportProductComponent
  ],
  imports: [
    CommonModule,
    ReportProductRoutingModule,
    CoreModule
  ]
})
export class ReportProductModule {
}
