import { autoEntityMetaReducer } from '@briebug/ngrx-auto-entity';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { accountReducer } from 'state/account.state';
import { customerReducer } from 'state/customer.state';
import { productReducer } from 'state/product.state';
import { environment } from '../../environments/environment';
import { IAppState } from './app.interfaces';

export const appReducer: ActionReducerMap<IAppState> = {
  router: routerReducer,
  customer: customerReducer,
  account: accountReducer,
  product: productReducer
};

export const appMetaReducers: Array<MetaReducer<IAppState>> = !environment.production
  ? [autoEntityMetaReducer, storeFreeze]
  : [autoEntityMetaReducer];
