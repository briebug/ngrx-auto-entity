import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({ modelName: 'Customer' })
export class Customer {
  @Key id: number;
  name: string;
  catchPhrase: string;
  isActive: boolean;
}
