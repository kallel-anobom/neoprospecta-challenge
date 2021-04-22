import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomersService } from '../customers.service';
import { CustomerData } from '../customers.model';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['name', 'age', 'city', 'action'];
  dataSourceCustomers: MatTableDataSource<CustomerData>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(public dialog: MatDialog, public customerService: CustomersService) {}

  ngOnInit(): void {
    this.onLoadValues();
  }

  ngOnChanges(): void {
    this.onLoadValues();
  }

  openDialog(data: CustomerData) {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { event } = result;

      if (event === 'updated') {
        this.dataSourceCustomers = new MatTableDataSource<CustomerData>(result as CustomerData[]);
        this.onLoadValues();
      }
    });
  }

  onLoadValues(): Subscription {
    return this.customerService
      .get()
      .pipe(
        filter((data) => !!data),
        map((customerData) => {
          return customerData.map((data: CustomerData) => data);
        }),
        catchError(({ error }) => {
          return throwError(error);
        }),
      )
      .subscribe((customers) => {
        this.dataSourceCustomers = new MatTableDataSource(customers);
        this.dataSourceCustomers.sort = this.sort;
        this.dataSourceCustomers.paginator = this.paginator;
      });
  }

  onDelete(customerData: CustomerData) {
    const { id } = customerData;

    this.dataSourceCustomers.data.filter((data) => {
      if (data.id === id) {
        this.customerService.detele(id).subscribe((result) => {
          this.dataSourceCustomers = new MatTableDataSource(result);
          this.onLoadValues();
        });
      }
    });
  }
}
