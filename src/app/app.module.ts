import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { CommonModule } from '@angular/common'
import { AppComponent } from './app.component'
import { DetailCustomerComponent } from './component/customer/detail-customer/detail-customer.component'
import { EditCustomerComponent } from './component/customer/edit-customer/edit-customer.component'
import { AddOrderComponent } from './component/order/add-order/add-order.component'
import { DetailOrderComponent } from './component/order/detail-order/detail-order.component'
import { MainOrderComponent } from './component/order/main-order/main-order.component'
import { AddItemComponent } from './component/item/add-item/add-item.component'
import { EditItemComponent } from './component/item/edit-item/edit-item.component'
import { DetailItemComponent } from './component/item/detail-item/detail-item.component'
import { MainItemComponent } from './component/item/main-item/main-item.component'
import { NavbarComponent } from './component/navbar/navbar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms'
import { EditOrderComponent } from './component/order/edit-order/edit-order.component'
import { MainCustomerComponent } from './component/customer/main-customer/main-customer.component'
import { AddCustomerComponent } from './component/customer/add-customer/add-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainCustomerComponent,
    DetailCustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    AddOrderComponent,
    DetailOrderComponent,
    MainOrderComponent,
    AddItemComponent,
    EditItemComponent,
    DetailItemComponent,
    MainItemComponent,
    NavbarComponent,
    EditOrderComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}