import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { OrderItem } from '../models/orderItem.model';
import { ordersFeatureState } from './feature.state';

export const { initialState, facade: OrderItemFacadeBase } = buildFeatureState(OrderItem, 'orders', ordersFeatureState);

export function orderItemReducer(state = initialState): IEntityState<OrderItem> {
  return state;
}
