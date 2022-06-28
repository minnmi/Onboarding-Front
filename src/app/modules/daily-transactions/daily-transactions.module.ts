import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DailyTransactionsRoutingModule} from './daily-transactions-routing.module';
import {DailyTransactionsComponent} from './daily-transactions/daily-transactions.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    DailyTransactionsComponent
  ],
  imports: [
    CommonModule,
    DailyTransactionsRoutingModule,
    CoreModule
  ]
})
export class DailyTransactionsModule {
}
