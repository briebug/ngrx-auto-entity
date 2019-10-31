import { OrderItem } from 'models/order-item.model';
import { Order } from 'models/order.model';

export class OrderInfo {
  order: Order;
  items: OrderItem[];
  customerName: string;
  dateLocaleString: string;
  total: number;
}
