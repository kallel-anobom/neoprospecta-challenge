import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { CustomerData } from './customers.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private basePath = `${environment.api}/customers`;

  constructor(private http: HttpClient) {}

  get(): Observable<CustomerData[]> {
    return this.http.get<CustomerData[]>(this.basePath);
  }

  update(customerId: number, customerData: CustomerData): Observable<CustomerData[]> {
    return this.http.put<CustomerData[]>(`${this.basePath}/${customerId}`, customerData);
  }

  detele(customerId: number): Observable<CustomerData[]> {
    return this.http.delete<CustomerData[]>(`${this.basePath}/${customerId}`);
  }
}
