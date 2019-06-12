import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Order } from 'models/order.model';

export const { initialState, facade: OrderFacadeBase } = buildState(Order);

export function orderReducer(state = initialState): IEntityState<Order> {
  return state;
}
