import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({
  modelName: 'Customer',
  comparer: (a: Customer, b: Customer) => (a.name || '').localeCompare(b.name || '')
})
export class Customer {
  @Key id: number;
  name: string;
  catchPhrase: string;
  isActive: boolean;
}
