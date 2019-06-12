import { Key } from '@briebug/ngrx-auto-entity';

export class Customer {
  @Key id: number;
  name: string;
  catchPhrase: string;
  isActive: boolean;
}
