import { IEntityState } from '@briebug/ngrx-auto-entity';
import { createFeatureSelector } from '@ngrx/store';
import { OrderItem } from '../models/orderItem.model';

export const ordersFeatureState = createFeatureSelector<IFeatureState>('orders');

export interface IFeatureState {
  orderItem: IEntityState<OrderItem>;
}

export type FeatureState = IFeatureState;
