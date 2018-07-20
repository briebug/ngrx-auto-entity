import { Action } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { EntityActions } from 'ngrx-auto-entity';

export enum CustomerActionType {
  SelectCustomer = '[Customer] Select customer'
}

export class SelectCustomer implements Action {
  readonly type = CustomerActionType.SelectCustomer;

  constructor(public payload: { id: number }) {}
}

export type CustomerActions = EntityActions<Customer> | SelectCustomer;
