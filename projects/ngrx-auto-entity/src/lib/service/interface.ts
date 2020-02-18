import { Observable } from 'rxjs';

import { IEntityInfo } from '../actions/entity-info';
import { Page, Range } from '../models';
import { EntityIdentity } from '../util/entity-state';
import { IEntityWithPageInfo, IEntityWithRangeInfo } from './wrapper-models';

// prettier-ignore
export interface IAutoEntityService<TModel> {
  load?(entityInfo: IEntityInfo, keys: any, criteria?: any): Observable<TModel>;

  loadMany?(entityInfo: IEntityInfo, criteria?: any): Observable<TModel[]>;

  loadAll?(entityInfo: IEntityInfo, criteria?: any): Observable<TModel[]>;

  loadPage?(entityInfo: IEntityInfo, page: Page, criteria?: any): Observable<IEntityWithPageInfo<TModel>>;

  loadRange?(entityInfo: IEntityInfo, range: Range, criteria?: any): Observable<IEntityWithRangeInfo<TModel>>;

  create?(entityInfo: IEntityInfo, entity: TModel | any, criteria?: any, originalEntity?: TModel): Observable<TModel>;

  createMany?(entityInfo: IEntityInfo, entities: Array<TModel | any>, criteria?: any, originalEntities?: TModel[]): Observable<TModel[]>;

  update?(entityInfo: IEntityInfo, entity: TModel | any, criteria?: any, originalEntity?: TModel): Observable<TModel>;

  updateMany?(entityInfo: IEntityInfo, entities: Array<TModel | any>, criteria?: any, originalEntities?: TModel[]): Observable<TModel[]>;

  replace?(entityInfo: IEntityInfo, entity: TModel | any, criteria?: any, originalEntity?: TModel): Observable<TModel>;

  replaceMany?(entityInfo: IEntityInfo, entities: Array<TModel | any>, criteria?: any, originalEntities?: TModel[]): Observable<TModel[]>;

  delete?(entityInfo: IEntityInfo, entity: TModel | any, criteria?: any, originalEntity?: TModel): Observable<TModel>;

  deleteMany?(entityInfo: IEntityInfo, entities: Array<TModel | any>, criteria?: any, originalEntities?: TModel[]): Observable<TModel[]>;

  deleteByKey?(entityInfo: IEntityInfo, key: EntityIdentity, criteria?: any): Observable<EntityIdentity>;

  deleteManyByKeys?(entityInfo: IEntityInfo, keys: EntityIdentity[], criteria?: any): Observable<EntityIdentity[]>;
}
