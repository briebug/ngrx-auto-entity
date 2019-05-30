import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Product } from 'models/product.model';

export const { initialState, facade: ProductFacadeBase } = buildState(Product);

export function productReducer(state = initialState): IEntityState<Product> {
  return state;
}
