import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportPersonRoutingModule} from './report-person-routing.module';
import {ReportPersonComponent} from './report-person/report-person.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    ReportPersonComponent
  ],
  imports: [
    CommonModule,
    ReportPersonRoutingModule,
    CoreModule
  ]
})
export class ReportPersonModule {
}
