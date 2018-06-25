import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { Delete, LoadMany } from 'ngrx-auto-entity';
import { Observable } from 'rxjs';
import { IAppState } from 'state/app.interfaces';
import { selectAllCustomers } from 'state/customer/customer.reducer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadMany(Customer));
    this.customers$ = this.store.pipe(select(selectAllCustomers));
  }

  onDelete(customer: Customer) {
    this.store.dispatch(new Delete(Customer, customer));
  }
}
