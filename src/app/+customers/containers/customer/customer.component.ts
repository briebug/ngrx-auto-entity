import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Create, Load, Update } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { State } from 'state/app.interfaces';
import { SelectCustomer } from 'state/customer/customer.actions';
import { selectCustomerIds, selectSelectedCustomer } from 'state/customer/customer.reducer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  /** The customer to display */
  customer: Observable<Customer>;

  /** Boolean indicating if the form is valid */
  valid = false;

  /** The updated customer data */
  private updatedCustomer: Customer;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<State>) {}

  ngOnInit() {
    this.customer = this.activatedRoute.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => params.get('id')),
      tap(id => {
        this.store.dispatch(new SelectCustomer({ id: +id }));
        this.hasCustomerWithIdInState(id)
          .pipe(first())
          .subscribe(exists => {
            if (!exists) {
              this.store.dispatch(new Load(Customer, id));
            }
          });
      }),
      switchMap(() => this.store.pipe(select(selectSelectedCustomer)))
    );
  }

  hasCustomerWithIdInState(id: string): Observable<boolean> {
    return this.store.pipe(
      select(selectCustomerIds),
      map(ids => ids.map(idInState => idInState.toString()).indexOf(id) > -1)
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

    if (this.updatedCustomer.id === undefined) {
      this.store.dispatch(new Create(Customer, this.updatedCustomer));
    } else {
      this.store.dispatch(new Update(Customer, this.updatedCustomer));
    }
  }

  private loadCustomerById(id: string) {
    this.hasCustomerWithIdInState(id).pipe(first());
  }
}
