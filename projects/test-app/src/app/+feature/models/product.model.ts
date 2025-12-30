import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({
  modelName: 'Product',
  pluralName: 'Products',
  uriName: 'products'
})
export class Product {
  @Key id: number;
  name: string;
  price: string;
  color: string;
  details: string;
  dateAdded: string;
}
