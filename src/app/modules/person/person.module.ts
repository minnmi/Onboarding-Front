import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonRoutingModule} from './person-routing.module';
import {PersonListComponent} from './person-list/person-list.component';
import {PersonRegisterComponent} from './person-register/person-register.component';
import {CoreModule} from "../../core/core.module";
import {PersonEmailComponent} from './person-email/person-email.component';
import {PersonPhoneComponent} from './person-phone/person-phone.component';
import {PersonAddressComponent} from './person-address/person-address.component';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonRegisterComponent,
    PersonEmailComponent,
    PersonPhoneComponent,
    PersonAddressComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    CoreModule
  ]
})
export class PersonModule {
}
