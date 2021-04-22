import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

import { CustomerData } from '../customers.model';
import { CustomersService } from '../customers.service';
import { CustomerListComponent } from '../customer-list/customer-list.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    city: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private customerData: CustomerData,
    public customerService: CustomersService,
    public dialogRef: MatDialogRef<CustomerListComponent>,
  ) {}

  ngOnInit(): void {
    this.updatedFormTarget();
  }

  updatedFormTarget(): void {
    return this.customerForm.patchValue(this.customerData);
  }

  onSubmit(event?: Event): void {
    event?.preventDefault();

    const { id } = this.customerData;

    const changeValuesForm = this.customerForm.getRawValue();

    this.customerService
      .update(id, changeValuesForm)
      .subscribe((data) => this.dialogRef.close({ event: 'updated', data }));
  }
}
