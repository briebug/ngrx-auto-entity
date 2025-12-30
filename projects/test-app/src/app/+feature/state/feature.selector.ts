import { createFeatureSelector } from '@ngrx/store';
import { FeatureState } from './feature.state';
import { FEATURE_STATE_NAME } from './feature.state-name';

export const selectFeatureState = createFeatureSelector<FeatureState>(FEATURE_STATE_NAME);
