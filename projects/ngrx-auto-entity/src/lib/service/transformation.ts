import { IEntityInfo } from '../actions/entity-info';
import { IEntityTransformer } from '../decorators/entity';
import { IEntityPageRef, IEntityRangeRef, IEntityRef } from './refs';

const FROM = 'fromServer';
const TO = 'toServer';

export const getTransforms = (transform: IEntityTransformer[], prop: string): Array<(value: any) => any> =>
  !!transform && !!transform.length ? transform.filter(tx => !!tx[prop]).map(tx => tx[prop]) : [value => value];

export const applyTransforms = (transforms: Array<(value: any) => any>) => (originalEntity: any): any =>
  transforms.reduce(
    (entity, transform) => {
      return transform(entity);
    },
    { ...originalEntity }
  );

export const transformFromServer = <TModel>(entityInfo: IEntityInfo) => (
  entityRef: IEntityRef<TModel>
): IEntityRef<TModel> => ({
  ...entityRef,
  entity: applyTransforms(getTransforms(entityInfo.transform, FROM))(entityRef.entity) as TModel
});

export const transformSetFromServer = <TModel>(entityInfo: IEntityInfo) => (
  entityRef: IEntityRef<TModel[]>
): IEntityRef<TModel[]> => {
  const transforms = getTransforms(entityInfo.transform, FROM);

  return {
    ...entityRef,
    entity: entityRef.entity.map(applyTransforms(transforms))
  };
};

export const transformPageFromServer = <TModel>(entityInfo: IEntityInfo) => (
  entityRef: IEntityPageRef<TModel>
): IEntityPageRef<TModel> => {
  const transforms = getTransforms(entityInfo.transform, FROM);

  return {
    ...entityRef,
    entity: entityRef.entity.map(applyTransforms(transforms))
  };
};

export const transformRangeFromServer = <TModel>(entityInfo: IEntityInfo) => (
  entityRef: IEntityRangeRef<TModel>
): IEntityRangeRef<TModel> => {
  const transforms = getTransforms(entityInfo.transform, FROM);

  return {
    ...entityRef,
    entity: entityRef.entity.map(applyTransforms(transforms))
  };
};

export const transformSingleFromServer = <TModel>(entityInfo: IEntityInfo) => (entity: any): TModel => {
  return applyTransforms(getTransforms(entityInfo.transform, FROM))(entity);
};

export const transformArrayFromServer = <TModel>(entityInfo: IEntityInfo) => (entities: TModel[]): TModel[] => {
  const transforms = getTransforms(entityInfo.transform, FROM);
  return entities.map(applyTransforms(transforms));
};

export const transformToServer = <TModel>(entityInfo: IEntityInfo) => (originalEntity: TModel): any =>
  applyTransforms(getTransforms(entityInfo.transform, TO))(originalEntity);

export const transformSetToServer = <TModel>(entityInfo: IEntityInfo) => (entities: TModel[]): any[] => {
  const transforms = getTransforms(entityInfo.transform, TO);

  return entities.map(applyTransforms(transforms));
};
