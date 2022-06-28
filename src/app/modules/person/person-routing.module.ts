import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonListComponent} from "./person-list/person-list.component";
import {PersonRegisterComponent} from "./person-register/person-register.component";

const routes: Routes = [
  {path: "", component: PersonListComponent},
  {path: "person-register", component: PersonRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule {
}
