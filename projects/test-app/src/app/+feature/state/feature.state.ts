import { makeEnvironmentProviders } from '@angular/core';
import { provideAutoEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, combineReducers, createFeature, provideState } from '@ngrx/store';

import { IProductState, PRODUCT_STATE_NAME, productReducer, provideProductState } from './product';
import { FEATURE_STATE_NAME } from './feature.state-name';

export interface FeatureState {
  [PRODUCT_STATE_NAME]: IProductState;
}

export const featureReducer: ActionReducerMap<FeatureState> = {
  [PRODUCT_STATE_NAME]: productReducer
};

export const featureState = createFeature({
  name: FEATURE_STATE_NAME,
  reducer: combineReducers(featureReducer)
});

export function provideFeatureState() {
  return makeEnvironmentProviders([provideState(featureState), provideAutoEntityState(), provideProductState()]);
}
