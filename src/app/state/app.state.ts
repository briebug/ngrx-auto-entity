import { IEntityState } from '@briebug/ngrx-auto-entity';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';

import { Account } from 'models/account.model';
import { Customer } from 'models/customer.model';
import { Order } from 'models/order.model';
import { Product } from 'models/product.model';
import { IRouterStateUrl } from 'state/shared/utils';

import { accountReducer } from 'state/account.state';
import { customerReducer } from 'state/customer.state';
import { orderReducer } from 'state/order.state';
import { productReducer } from 'state/product.state';

export interface IAppState {
  router: RouterReducerState<IRouterStateUrl>;
  customer: IEntityState<Customer>;
  account: IEntityState<Account>;
  order: IEntityState<Order>;
  product: IEntityState<Product>;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  customer: customerReducer,
  account: accountReducer,
  order: orderReducer,
  product: productReducer
};

export const appMetaReducers: Array<MetaReducer<AppState>> = !environment.production
  ? [storeFreeze] : [];
