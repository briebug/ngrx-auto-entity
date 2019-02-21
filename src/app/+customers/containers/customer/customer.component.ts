import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Create, Load, SelectByKey, Update } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Customer } from 'models/customer.model';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { State } from 'state/app.interfaces';
import { currentCustomer, customerIds } from 'state/customer.state';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customer: Observable<Customer>;
  valid = false;

  private updatedCustomer: Customer;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<State>) {}

  ngOnInit() {
    this.customer = this.activatedRoute.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => +params.get('id')),
      tap(id => {
        this.store.dispatch(new SelectByKey(Customer, id));
        this.hasCustomerWithIdInState(id)
          .pipe(first())
          .subscribe(exists => {
            if (!exists) {
              this.store.dispatch(new Load(Customer, id));
            }
          });
      }),
      switchMap(() => this.store.pipe(select(currentCustomer)))
    );
  }

  hasCustomerWithIdInState(id: number): Observable<boolean> {
    return this.store.pipe(
      select(customerIds),
      map(ids => ids.indexOf(id) > -1)
    );
  }

  onCustomerChange(payload: { customer: Customer; valid: boolean }) {
    this.valid = payload.valid;
    if (this.valid) {
      this.updatedCustomer = payload.customer;
    }
  }

  onSave() {
    if (!this.valid) {
      return;
    }

    if (this.updatedCustomer.id == null) {
      this.store.dispatch(new Create(Customer, this.updatedCustomer));
    } else {
      this.store.dispatch(new Update(Customer, this.updatedCustomer));
    }
  }

  private loadCustomerById(id: number) {
    this.hasCustomerWithIdInState(id).pipe(first());
  }
}
