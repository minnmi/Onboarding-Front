import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportProductComponent} from "./report-product/report-product.component";

const routes: Routes = [
  {path: "", component: ReportProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportProductRoutingModule {
}
