import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({ modelName: 'Account' })
export class Account {
  @Key id: number;
  customerId: number;
  accountNumber: number;
  name: string;
  amount: number;
}
