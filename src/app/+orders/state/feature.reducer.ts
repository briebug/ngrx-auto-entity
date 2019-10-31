import { ActionReducerMap } from '@ngrx/store';

import { FeatureState } from './feature.state';
import { orderItemReducer } from '../../state/order-item.state';

export const featureReducer: ActionReducerMap<FeatureState> = {
  orderItem: orderItemReducer
};
