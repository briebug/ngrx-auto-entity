import { IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { customerReducer } from 'state/customer.state';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';

export interface IAppState {
  customer: IEntityState<Customer>;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
  customer: customerReducer
};

export const appMetaReducers: Array<MetaReducer<AppState>> = !environment.production ? [storeFreeze] : [];
