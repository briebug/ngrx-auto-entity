import { Action } from '@ngrx/store';
import { Customer } from './../../models/customer.model';

export enum CustomerActionType {
  SelectCustomer = '[Customer] Select customer'
}

export class SelectCustomer implements Action {
  readonly type = CustomerActionType.SelectCustomer;

  constructor(public customer: Customer) {}
}

export type CustomerAction = SelectCustomer;
