import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({ modelName: 'Product' })
export class Product {
  @Key id: number;
  name: string;
  price: string;
  color: string;
  details: string;
  dateAdded: string;
}
