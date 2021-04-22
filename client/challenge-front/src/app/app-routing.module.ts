import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: '', component: CustomersComponent,
    children: [
      { path: 'form/:customerId', component: CustomerFormComponent, pathMatch: 'full' },
      { path: 'list', component: CustomerListComponent, pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
