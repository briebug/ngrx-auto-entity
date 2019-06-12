import { Key } from '@briebug/ngrx-auto-entity';

export class OrderItem {
  @Key orderId: number;
  @Key productId: number;
  quantity: number;
}
