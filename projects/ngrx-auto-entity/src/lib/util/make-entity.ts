import { TNew } from '../actions/model-constructor';

const createEntity = <TModel>(Type: TNew<TModel>) => (obj: any) => ({ entity: Type ? new Type() : undefined, obj });

const populateEntity = <TModel>({ entity, obj }): TModel =>
  entity ? Object.keys(obj || {}).reduce((populated, key) => ((populated[key] = obj[key]), populated), entity) : undefined;

export const makeEntity = <TModel>(Type: TNew<TModel>) => obj => obj && Type && Object.assign(Object.create(Type.prototype), obj);
