import { IEntityState } from '@briebug/ngrx-auto-entity';
import { RouterReducerState } from '@ngrx/router-store';
import { Account } from 'models/account.model';
import { Customer } from 'models/customer.model';
import { Product } from 'models/product.model';
import { IRouterStateUrl } from './shared/utils';

export interface IAppState {
  router: RouterReducerState<IRouterStateUrl>;
  customer: IEntityState<Customer>;
  account: IEntityState<Account>;
  product: IEntityState<Product>;
}

export type AppState = IAppState;
