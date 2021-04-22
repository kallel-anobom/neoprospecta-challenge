import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomersComponent } from './customers.component';
import { CustomersService } from './customers.service';

import { HeaderComponent } from '../shared/header/header.component';

@NgModule({
  declarations: [CustomerListComponent, CustomerFormComponent, CustomersComponent, HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatDialogModule, MatInputModule, HttpClientModule],
  exports: [MatTableModule, MatSortModule, MatInputModule],
  providers: [CustomersService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerModule {}
