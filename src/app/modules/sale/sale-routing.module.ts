import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SaleRegisterComponent} from "./sale-register/sale-register.component";

const routes: Routes = [
  {path: "", component: SaleRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule {
}
