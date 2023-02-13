import { IEntityInfo } from '../actions/entity-info';
import { IEntityTransformer } from '../decorators/entity-options';

const FROM = 'fromServer';
const TO = 'toServer';

type TransformFn = (value: any, criteria?: any) => any;
const identity = value => value;

export const getTransforms = (transform: IEntityTransformer[], prop: string): TransformFn[] =>
  !!transform && !!transform.length
    ? transform.filter(tx => !!tx[prop]).map(tx => tx[prop]) // select custom transformations
    : [identity]; // provide identity transformation as default

export const applyTransforms =
  (transforms: TransformFn[], criteria?: any) =>
  (originalEntity: any): any =>
    transforms.reduce((entity, transform) => transform(entity, criteria), { ...originalEntity });

export const transformSingleFromServer =
  <TModel>(entityInfo: IEntityInfo, criteria?: any) =>
  (entity: any): TModel => {
    const transforms = getTransforms(entityInfo.transform, FROM);
    return applyTransforms(transforms, criteria)(entity);
  };

export const transformArrayFromServer =
  <TModel>(entityInfo: IEntityInfo, criteria?: any) =>
  (entities: TModel[]): TModel[] => {
    const transforms = getTransforms(entityInfo.transform, FROM);
    return entities.map(applyTransforms(transforms, criteria));
  };

export const transformSingleToServer =
  <TModel>(entityInfo: IEntityInfo, criteria?: any) =>
  (originalEntity: TModel): any => {
    const transforms = getTransforms(entityInfo.transform, TO).reverse();
    return applyTransforms(transforms, criteria)(originalEntity);
  };

export const transformArrayToServer =
  <TModel>(entityInfo: IEntityInfo, criteria?: any) =>
  (entities: TModel[]): any[] => {
    const transforms = getTransforms(entityInfo.transform, TO).reverse();
    return entities.map(applyTransforms(transforms, criteria));
  };

// User utilities

export const transformEntityFromServer = <TModel>(entityInfo: IEntityInfo, entity: any, criteria?: any): TModel =>
  transformSingleFromServer<TModel>(entityInfo, criteria)(entity);

export const transformEntitiesFromServer = <TModel>(entityInfo: IEntityInfo, entities: any[], criteria?: any): TModel[] =>
  transformArrayFromServer<TModel>(entityInfo, criteria)(entities);

export const transformEntityToServer = <TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): any =>
  transformSingleToServer<TModel>(entityInfo, criteria)(entity);

export const transformEntitiesToServer = <TModel>(entityInfo: IEntityInfo, entities: any[], criteria?: any): TModel[] =>
  transformArrayToServer<TModel>(entityInfo, criteria)(entities);
