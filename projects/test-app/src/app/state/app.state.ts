import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import { customerReducer, ICustomerState } from './customer.state';

export interface IAppState {
  customer: ICustomerState;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
  customer: customerReducer
};

export const appMetaReducers: Array<MetaReducer<AppState>> = !environment.production ? [storeFreeze] : [];
