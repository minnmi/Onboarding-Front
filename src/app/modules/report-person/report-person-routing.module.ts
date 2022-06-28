import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportPersonComponent} from "./report-person/report-person.component";

const routes: Routes = [
  {path: "", component: ReportPersonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportPersonRoutingModule {
}
