import { EntityActions } from '@briebug/ngrx-auto-entity';
import { Action } from '@ngrx/store';
import { Customer } from 'models/customer.model';

export enum CustomerActionType {
  SelectCustomer = '[Customer] Select customer'
}

export class SelectCustomer implements Action {
  readonly type = CustomerActionType.SelectCustomer;

  constructor(public payload: { id: number }) {}
}

export type CustomerActions = EntityActions<Customer> | SelectCustomer;
