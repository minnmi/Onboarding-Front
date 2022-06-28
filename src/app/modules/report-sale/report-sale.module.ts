import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportSaleRoutingModule} from './report-sale-routing.module';
import {ReportSaleComponent} from './report-sale/report-sale.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    ReportSaleComponent
  ],
  imports: [
    CommonModule,
    ReportSaleRoutingModule,
    CoreModule
  ]
})
export class ReportSaleModule {
}
