import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainCustomerComponent } from './component/customer/main-customer/main-customer.component'
import { DetailCustomerComponent } from './component/customer/detail-customer/detail-customer.component'
import { AddCustomerComponent } from './component/customer/add-customer/add-customer.component'
import { EditCustomerComponent } from './component/customer/edit-customer/edit-customer.component'
import { AddOrderComponent } from './component/order/add-order/add-order.component'
import { DetailOrderComponent } from './component/order/detail-order/detail-order.component'
import { MainOrderComponent } from './component/order/main-order/main-order.component'
import { AddItemComponent } from './component/item/add-item/add-item.component'
import { EditItemComponent } from './component/item/edit-item/edit-item.component'
import { DetailItemComponent } from './component/item/detail-item/detail-item.component'
import { MainItemComponent } from './component/item/main-item/main-item.component'
import { NavbarComponent } from './component/navbar/navbar.component'
import { EditOrderComponent } from './component/order/edit-order/edit-order.component'


const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full'},
  { path: 'customer', component: MainCustomerComponent },
  { path: 'detail-customer/:customerId', component: DetailCustomerComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'edit-customer/:customerId', component: EditCustomerComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'detail-order/:orderId', component: DetailOrderComponent },
  { path: 'order', component: MainOrderComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'edit-item/:itemId', component: EditItemComponent },
  { path: 'detail-item/:itemId', component: DetailItemComponent },
  { path: 'item', component: MainItemComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'edit-order/:orderId', component: EditOrderComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}