import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { OrderItem } from '../models/order-item.model';

export const { initialState, facade: OrderItemFacadeBase } = buildState(OrderItem, { totalPageableCount: 300 });

export function orderItemReducer(state = initialState): IEntityState<OrderItem> {
  return state;
}
