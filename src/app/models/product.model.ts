import { Key } from '@briebug/ngrx-auto-entity';

export class Product {
  @Key id: number;
  name: string;
  price: string;
  color: string;
  details: string;
  dateAdded: string;
}
