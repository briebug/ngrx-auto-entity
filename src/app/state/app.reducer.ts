import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reactiveEntityMetaReducer } from 'ngrx-auto-entity';
import { storeFreeze } from 'ngrx-store-freeze';

import { accountReducer } from 'state/account/account.reducer';
import { customerReducer } from 'state/customer/customer.reducer';
import { environment } from '../../environments/environment';
import { IAppState } from './app.interfaces';

export const appReducer: ActionReducerMap<IAppState> = {
  router: routerReducer,
  customer: customerReducer,
  account: accountReducer
};

export const appMetaReducers: Array<MetaReducer<IAppState>> = !environment.production
  ? [reactiveEntityMetaReducer, storeFreeze]
  : [reactiveEntityMetaReducer];
