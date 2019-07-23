import { ActionReducerMap } from '@ngrx/store';

import { FeatureState } from './feature.state';
import { orderItemReducer } from './orderItem.state';

export const featureReducer: ActionReducerMap<FeatureState> = {
  orderItem: orderItemReducer
};
