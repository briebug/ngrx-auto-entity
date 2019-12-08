import { Key } from '@briebug/ngrx-auto-entity';

export class Account {
  @Key id: number;
  customerId: number;
  accountNumber: number;
  name: string;
  amount: number;
}
