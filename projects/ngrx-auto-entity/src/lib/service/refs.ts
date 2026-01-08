import { IEntityInfo } from '../actions/entity-info';
import { IPageInfo, IRangeInfo } from '../models';
import { EntityIdentity } from '../types/entity-identity';

export interface IEntityRef<TModel> {
  info: IEntityInfo<TModel>;
  entity: TModel;
}

export interface IEntitiesRef<TModel> {
  info: IEntityInfo<TModel>;
  entity: TModel[];
}

export interface IEntityIdentityRef {
  info: IEntityInfo;
  entityIdentity: EntityIdentity;
}

export interface IEntityIdentitiesRef {
  info: IEntityInfo;
  entityIdentities: EntityIdentity[];
}

export interface IEntityPageRef<TModel> extends IEntitiesRef<TModel> {
  pageInfo: IPageInfo;
}

export interface IEntityRangeRef<TModel> extends IEntitiesRef<TModel> {
  rangeInfo: IRangeInfo;
}
