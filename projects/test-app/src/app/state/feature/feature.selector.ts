import { createFeatureSelector } from '@ngrx/store';
import { FeatureState } from './feature.state';

export const featureState = createFeatureSelector<FeatureState>('feature');
