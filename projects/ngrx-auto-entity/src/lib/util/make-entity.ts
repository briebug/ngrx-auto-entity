import { TNew } from '../actions/model-constructor';

export const makeEntity =
  <TModel>(Type: TNew<TModel>) =>
  (obj: unknown): TModel =>
    obj && Type && Object.assign(Object.create(Type.prototype), obj);
