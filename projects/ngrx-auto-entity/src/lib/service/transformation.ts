import { IEntityInfo } from '../actions/entity-info';
import { IEntityTransformer } from '../decorators/entity';

const FROM = 'fromServer';
const TO = 'toServer';

type TransformFn = (value: any, criteria?: any) => any;
const identity = value => value;

export const getTransforms = (transform: IEntityTransformer[], prop: string): TransformFn[] =>
  !!transform && !!transform.length
    ? transform.filter(tx => !!tx[prop]).map(tx => tx[prop]) // select custom transformations
    : [identity]; // provide identity transformation as default

export const applyTransforms = (transforms: TransformFn[], criteria?: any) => (originalEntity: any): any =>
  transforms.reduce((entity, transform) => transform(entity, criteria), { ...originalEntity });

export const transformSingleFromServer = <TModel>(entityInfo: IEntityInfo, criteria?: any) => (entity: any): TModel => {
  const transforms = getTransforms(entityInfo.transform, FROM);
  return applyTransforms(transforms, criteria)(entity);
};

export const transformArrayFromServer = <TModel>(entityInfo: IEntityInfo, criteria?: any) => (
  entities: TModel[]
): TModel[] => {
  const transforms = getTransforms(entityInfo.transform, FROM);
  return entities.map(applyTransforms(transforms, criteria));
};

export const transformSingleToServer = <TModel>(entityInfo: IEntityInfo, criteria?: any) => (
  originalEntity: TModel
): any => {
  const transforms = getTransforms(entityInfo.transform, TO);
  return applyTransforms(transforms, criteria)(originalEntity);
};

export const transformArrayToServer = <TModel>(entityInfo: IEntityInfo, criteria?: any) => (
  entities: TModel[]
): any[] => {
  const transforms = getTransforms(entityInfo.transform, TO);
  return entities.map(applyTransforms(transforms, criteria));
};
