import { ActionReducerMap } from '@ngrx/store';
import { customerReducer, ICustomerState } from './customer.state';

export interface FeatureState {
  customer: ICustomerState;
}

export const featureReducer: ActionReducerMap<FeatureState> = {
  customer: customerReducer
};
