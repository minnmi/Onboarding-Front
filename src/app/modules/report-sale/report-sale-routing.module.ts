import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportSaleComponent} from "./report-sale/report-sale.component";

const routes: Routes = [
  {path: "", component: ReportSaleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSaleRoutingModule {
}
