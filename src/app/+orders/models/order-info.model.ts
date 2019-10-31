import { Order } from 'models/order.model';
import { OrderItem } from 'models/order-item.model';

export class OrderInfo {
  order: Order;
  items: OrderItem[];
  customerName: string;
  dateOfOrder: string;
  total: number;
}
