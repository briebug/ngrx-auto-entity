import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { OrderItem } from '../models/order-item.model';

export const { initialState, facade: OrderItemFacadeBase } = buildState(OrderItem);

export function orderItemReducer(state = initialState): IEntityState<OrderItem> {
  return state;
}
