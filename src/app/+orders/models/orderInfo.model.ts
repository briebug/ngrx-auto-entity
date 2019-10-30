import { Order } from 'models/order.model';

export class OrderInfo {
  order: Order;
  customerName: string;
  dateOfOrder: string;
  numberOfItems: number;
  total: number;
}
