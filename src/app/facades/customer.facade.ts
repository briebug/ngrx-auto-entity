import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'state/app.state';
import { CustomerFacadeBase } from 'state/customer.state';

@Injectable({
  providedIn: 'root'
})
export class CustomerFacade extends CustomerFacadeBase {
  constructor(store: Store<AppState>) {
    super(Customer, store);
  }

  get active(): Observable<Customer[]> {
    return this.all.pipe(
      map(customers => customers.filter(customer => customer.isActive))
    );
  }

  top(count: number): Observable<Customer[]> {
    return this.active.pipe(map(customers => customers.slice(0, count)));
  }
}
