import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AddCustomerComponent } from './component/customer/add-customer/add-customer.component';
import { DetailCustomerComponent } from './component/customer/detail-customer/detail-customer.component';
import { EditCustomerComponent } from './component/customer/edit-customer/edit-customer.component';
import { MainCustomerComponent } from './component/customer/main-customer/main-customer.component';
import { AddItemComponent } from './component/item/add-item/add-item.component';
import { DetailItemComponent } from './component/item/detail-item/detail-item.component';
import { EditItemComponent } from './component/item/edit-item/edit-item.component';
import { MainItemComponent } from './component/item/main-item/main-item.component';
import { AddOrderComponent } from './component/order/add-order/add-order.component';
import { DetailOrderComponent } from './component/order/detail-order/detail-order.component';
import { EditOrderComponent } from './component/order/edit-order/edit-order.component';
import { MainOrderComponent } from './component/order/main-order/main-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddCustomerComponent,
    DetailCustomerComponent,
    EditCustomerComponent,
    MainCustomerComponent,
    AddItemComponent,
    DetailItemComponent,
    EditItemComponent,
    MainItemComponent,
    AddOrderComponent,
    DetailOrderComponent,
    EditOrderComponent,
    MainOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
