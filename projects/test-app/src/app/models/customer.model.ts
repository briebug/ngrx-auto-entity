import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({
  modelName: 'Customer',
  pluralName: 'Customers',
  uriName: 'customers',
  comparer: (a: Customer, b: Customer) => (a.name ?? '').localeCompare(b.name ?? '')
})
export class Customer {
  @Key id: number;
  name: string;
  catchPhrase: string;
  isActive: boolean;
  address: {
    street1: string;
    city: string;
    state: string;
    zip: string;
  };
}
