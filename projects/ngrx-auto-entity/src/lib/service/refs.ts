import { IEntityInfo } from '../actions/entity-info';
import { IPageInfo, IRangeInfo } from '../models';
import { EntityIdentity } from '../util/entity-state';

export interface IEntityRef<TModel> {
  info: IEntityInfo;
  entity: TModel;
}

export interface IEntityIdentityRef {
  info: IEntityInfo;
  entityIdentity: EntityIdentity;
}

export interface IEntityIdentitiesRef {
  info: IEntityInfo;
  entityIdentities: EntityIdentity[];
}

export interface IEntityPageRef<TModel> extends IEntityRef<TModel[]> {
  pageInfo: IPageInfo;
}

export interface IEntityRangeRef<TModel> extends IEntityRef<TModel[]> {
  rangeInfo: IRangeInfo;
}
