import { IEntityState } from '@briebug/ngrx-auto-entity';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Account } from 'models/account.model';
import { Customer } from 'models/customer.model';
import { Order } from 'models/order.model';
import { OrderItem } from 'models/orderItem.model';
import { Product } from 'models/product.model';
import { storeFreeze } from 'ngrx-store-freeze';
import { accountReducer } from 'state/account.state';
import { customerReducer } from 'state/customer.state';
import { orderReducer } from 'state/order.state';
import { orderItemReducer } from 'state/order-item.state';
import { productReducer } from 'state/product.state';
import { IRouterStateUrl } from 'state/shared/utils';
import { environment } from '../../environments/environment';

export interface IAppState {
  router: RouterReducerState<IRouterStateUrl>;
  customer: IEntityState<Customer>;
  account: IEntityState<Account>;
  order: IEntityState<Order>;
  product: IEntityState<Product>;
  orderItem: IEntityState<OrderItem>;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  customer: customerReducer,
  account: accountReducer,
  order: orderReducer,
  product: productReducer,
  orderItem: orderItemReducer
};

export const appMetaReducers: Array<MetaReducer<AppState>> = !environment.production ? [storeFreeze] : [];
