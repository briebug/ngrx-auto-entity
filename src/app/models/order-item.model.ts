import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({ modelName: 'OrderItem' })
export class OrderItem {
  @Key id: string;
  orderId: number;
  productId: number;
  quantity: number;
}
