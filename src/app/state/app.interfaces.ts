import { RouterReducerState } from '@ngrx/router-store';
import { IAccountEntityState } from 'state/account/account.state';
import { ICustomerEntityState } from 'state/customer/customer.state';
import { IRouterStateUrl } from './shared/utils';

export interface IAppState {
  router: RouterReducerState<IRouterStateUrl>;
  customer: ICustomerEntityState;
  account: IAccountEntityState;
}

export type State = IAppState;
