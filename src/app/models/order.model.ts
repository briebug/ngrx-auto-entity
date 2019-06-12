import { Key } from '@briebug/ngrx-auto-entity';

export enum OrderStatus {
  pending = 'pending',
  open = 'open',
  completed = 'completed',
  archived = 'archived'
}

export class Order {
  @Key id: number;
  accountId: number;
  customerId: number;
  dateOfOrder: string;
  status: OrderStatus;
}
