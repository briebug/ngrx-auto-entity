import { Key } from 'ngrx-auto-entity';

export class Customer {
  @Key id: number;
  name: string;
  catchPhrase: string;
}
