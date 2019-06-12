import { OrderStatus } from 'models/order.model';

export class OrderInfo {
  id: number;
  customer: string;
  dateOfOrder: string;
  status: OrderStatus;
}
