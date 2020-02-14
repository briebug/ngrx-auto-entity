import { Entity, Key } from '@briebug/ngrx-auto-entity';

export const amountXform = {
  fromServer: (data: any): Account => ((data.amount = +data.amount), data),
  toServer: (entity: any): any => ((entity.amount = entity.amount.toFixed(2)), entity)
};

@Entity({
  modelName: 'Account',
  transform: [amountXform]
})
export class Account {
  @Key id: number;
  customerId: number;
  accountNumber: string;
  name: string;
  amount: number;
}
