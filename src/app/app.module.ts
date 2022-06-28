import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HomeComponent} from "./modules/home/home.component";
import {BreadcrumbService} from "./shared/services/breadcrumb.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {AppComponent} from "./app.component";
import {TableModule} from 'primeng/table';
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule
  ],
  providers: [BreadcrumbService, MessageService, DialogService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
