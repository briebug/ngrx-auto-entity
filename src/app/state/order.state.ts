import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { props } from '@ngrx/store';
import { OrderItem } from 'models/order-item.model';
import { Order } from 'models/order.model';
import { createCorrelatedAction } from 'shared/libs/actions.lib';
import { PartialPick } from 'shared/types/util.type';

export const { initialState, facade: OrderFacadeBase, entityState: OrdersEntityState } = buildState(Order);

export function orderReducer(state = initialState): IEntityState<Order> {
  return state;
}

/* Actions */
export interface IUpsertFullOrderProps {
  order: Readonly<PartialPick<Order, 'id' | 'accountId'>>,
  orderItems: ReadonlyArray<PartialPick<OrderItem, 'id' | 'orderId'>>
}
export const upsertFullOrder = createCorrelatedAction(
  '[Orders] Upsert Full Order',
  props<IUpsertFullOrderProps>()
)