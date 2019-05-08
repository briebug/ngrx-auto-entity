import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { AppState } from 'state/app.interfaces';
import { CustomerFacadeBase } from 'state/customer.state';

@Injectable({
  providedIn: 'root'
})
export class CustomerFacade extends CustomerFacadeBase {
  constructor(store: Store<AppState>) {
    super(Customer, store);
  }
}
