import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { Delete, LoadAll } from 'ngrx-auto-entity';
import { Observable } from 'rxjs';
import { IAppState } from 'state/app.interfaces';
import { SelectCustomer } from 'state/customer/customer.actions';
import { selectAllCustomers } from 'state/customer/customer.reducer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private router: Router, private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadAll(Customer));
    this.customers$ = this.store.pipe(select(selectAllCustomers));
  }

  onDelete(customer: Customer) {
    this.store.dispatch(new Delete(Customer, customer));
  }

  onEdit(customer: Customer) {
    this.store.dispatch(new SelectCustomer({ id: customer.id }));
    this.router.navigate(['customers', customer.id]);
  }
}
