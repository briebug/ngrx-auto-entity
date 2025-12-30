import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { CUSTOMER_STATE_NAME, customerReducer, ICustomerState } from './customer';
import { ACCOUNT_STATE_NAME, accountReducer, IAccountState } from './account';
import { environment } from '../../environments/environment';

export interface IAppState {
  [ACCOUNT_STATE_NAME]: IAccountState;
  [CUSTOMER_STATE_NAME]: ICustomerState;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
  [ACCOUNT_STATE_NAME]: accountReducer,
  [CUSTOMER_STATE_NAME]: customerReducer
};

export const appMetaReducers: Array<MetaReducer<AppState>> = !environment.production ? [] : [];
