import { Key } from '@briebug/ngrx-auto-entity';

export class OrderItem {
  @Key id: string;
  orderId: number;
  productId: number;
  quantity: number;
}
