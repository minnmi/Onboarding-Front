import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryListComponent} from './category-list/category-list.component';
import {CoreModule} from "../../core/core.module";
import {CategoryRegisterComponent} from "./category-register/category-register.component";


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryRegisterComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    CoreModule
  ]
})
export class CategoryModule {
}
