import { RouterReducerState } from '@ngrx/router-store';
import { IEntityState } from 'ngrx-auto-entity';
import { Customer } from 'state/customer/customer.model';

import { IRouterStateUrl } from './shared/utils';

export interface ICustomerEntity extends IEntityState<Customer> {
  loading: boolean;
  selectedCustomerId: number;
  foo: any;
}

export interface ICustomerEntityState extends IEntityState<ICustomerEntity> {}

// entity properties must be camelCase of class name (e.g. Customer -> customer)
export interface IAppState {
  router: RouterReducerState<IRouterStateUrl>;
  customer: ICustomerEntityState;
}

export type State = IAppState;
