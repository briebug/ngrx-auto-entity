import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { IEntityInfo } from '../actions/entity-info';
import { Page, Range } from '../models';
import { EntityIdentity } from '../util/entity-state';
import { IEntityIdentitiesRef, IEntityIdentityRef, IEntityPageRef, IEntityRangeRef, IEntityRef } from './refs';
import { callService } from './service-invocation';
import {
  transformArrayFromServer,
  transformArrayToServer,
  transformSingleFromServer,
  transformSingleToServer
} from './transformation';
import { IEntityWithPageInfo, IEntityWithRangeInfo } from './wrapper-models';

/**
 * Looks up client-provided entity service class using Angular's injector and this package's naming
 * conventions.  Then calls client's service and provides success/failure handling.
 */
@Injectable()
export class NgrxAutoEntityService {
  constructor(private injector: Injector) {}

  load<TModel>(entityInfo: IEntityInfo, keys: any, criteria?: any): Observable<IEntityRef<TModel>> {
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'load',
      entityInfo,
      this.injector,
      service => service.load(entityInfo, keys, criteria),
      entity => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo, criteria)(entity) as TModel })
    );
  }

  loadAll<TModel>(entityInfo: IEntityInfo, criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'loadAll',
      entityInfo,
      this.injector,
      service => service.loadAll(entityInfo, criteria),
      entities => ({ info: entityInfo, entity: transformArrayFromServer(entityInfo, criteria)(entities) as TModel[] })
    );
  }

  loadMany<TModel>(entityInfo: IEntityInfo, criteria?: any): Observable<IEntityRef<TModel[]>> {
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'loadMany',
      entityInfo,
      this.injector,
      service => service.loadMany(entityInfo, criteria),
      entities => ({ info: entityInfo, entity: transformArrayFromServer(entityInfo, criteria)(entities) as TModel[] })
    );
  }

  loadPage<TModel>(entityInfo: IEntityInfo, page: Page, criteria?: any): Observable<IEntityPageRef<TModel>> {
    return callService<TModel, IEntityWithPageInfo<TModel>, IEntityPageRef<TModel>>(
      'loadPage',
      entityInfo,
      this.injector,
      service => service.loadPage(entityInfo, page, criteria),
      result => ({
        info: entityInfo,
        pageInfo: result.pageInfo,
        entity: transformArrayFromServer(entityInfo, criteria)(result.entities) as TModel[]
      })
    );
  }

  loadRange<TModel>(entityInfo: IEntityInfo, range: Range, criteria?: any): Observable<IEntityRangeRef<TModel>> {
    return callService<TModel, IEntityWithRangeInfo<TModel>, IEntityRangeRef<TModel>>(
      'loadRange',
      entityInfo,
      this.injector,
      service => service.loadRange(entityInfo, range, criteria),
      result => ({
        info: entityInfo,
        rangeInfo: result.rangeInfo,
        entity: transformArrayFromServer(entityInfo, criteria)(result.entities) as TModel[]
      })
    );
  }

  create<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    const transformed = transformSingleToServer(entityInfo, criteria)(entity);
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'create',
      entityInfo,
      this.injector,
      service => service.create(entityInfo, transformed, criteria, entity),
      created => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo, criteria)(created) as TModel })
    );
  }

  createMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    const transformed = transformArrayToServer(entityInfo, criteria)(entities);
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'createMany',
      entityInfo,
      this.injector,
      service => service.createMany(entityInfo, transformed, criteria, entities),
      created => ({ info: entityInfo, entity: transformArrayFromServer(entityInfo, criteria)(created) as TModel[] })
    );
  }

  update<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    const transformed = transformSingleToServer(entityInfo, criteria)(entity);
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'update',
      entityInfo,
      this.injector,
      service => service.update(entityInfo, transformed, criteria, entity),
      updated => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo, criteria)(updated) as TModel })
    );
  }

  updateMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    const transformed = transformArrayToServer(entityInfo, criteria)(entities);
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'updateMany',
      entityInfo,
      this.injector,
      service => service.updateMany(entityInfo, transformed, criteria, entities),
      updatedEntities => ({
        info: entityInfo,
        entity: transformArrayFromServer(entityInfo, criteria)(updatedEntities) as TModel[]
      })
    );
  }

  upsert<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    const transformed = transformSingleToServer(entityInfo, criteria)(entity);
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'upsert',
      entityInfo,
      this.injector,
      service => service.upsert(entityInfo, transformed, criteria, entity),
      upserted => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo, criteria)(upserted) as TModel })
    );
  }

  upsertMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    const transformed = transformArrayToServer(entityInfo, criteria)(entities);
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'upsertMany',
      entityInfo,
      this.injector,
      service => service.upsertMany(entityInfo, transformed, criteria, entities),
      upsertedEntities => ({
        info: entityInfo,
        entity: transformArrayFromServer(entityInfo, criteria)(upsertedEntities) as TModel[]
      })
    );
  }

  replace<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    const transformed = transformSingleToServer(entityInfo, criteria)(entity);
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'replace',
      entityInfo,
      this.injector,
      service => service.replace(entityInfo, transformed, criteria, entity),
      replaced => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo, criteria)(replaced) as TModel })
    );
  }

  replaceMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    const transformed = transformArrayToServer(entityInfo, criteria)(entities);
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'replaceMany',
      entityInfo,
      this.injector,
      service => service.replaceMany(entityInfo, transformed, criteria, entities),
      replaced => ({ info: entityInfo, entity: transformArrayFromServer(entityInfo, criteria)(replaced) as TModel[] })
    );
  }

  delete<TModel>(entityInfo: IEntityInfo, entity: TModel, criteria?: any): Observable<IEntityRef<TModel>> {
    const transformed = transformSingleToServer(entityInfo, criteria)(entity);
    return callService<TModel, TModel, IEntityRef<TModel>>(
      'delete',
      entityInfo,
      this.injector,
      service => service.delete(entityInfo, transformed, criteria, entity),
      deleted => ({ info: entityInfo, entity: transformSingleFromServer(entityInfo, criteria)(deleted) as TModel })
    );
  }

  deleteMany<TModel>(entityInfo: IEntityInfo, entities: TModel[], criteria?: any): Observable<IEntityRef<TModel[]>> {
    const transformed = transformArrayToServer(entityInfo, criteria)(entities);
    return callService<TModel, TModel[], IEntityRef<TModel[]>>(
      'deleteMany',
      entityInfo,
      this.injector,
      service => service.deleteMany(entityInfo, transformed, criteria, entities),
      deleted => ({ info: entityInfo, entity: transformArrayFromServer(entityInfo, criteria)(deleted) as TModel[] })
    );
  }

  deleteByKey<TModel>(entityInfo: IEntityInfo, key: EntityIdentity, criteria?: any): Observable<IEntityIdentityRef> {
    return callService<TModel, EntityIdentity, IEntityIdentityRef>(
      'deleteByKey',
      entityInfo,
      this.injector,
      service => service.deleteByKey(entityInfo, key, criteria),
      deletedKey => ({ info: entityInfo, entityIdentity: deletedKey })
    );
  }

  deleteManyByKey<TModel>(
    entityInfo: IEntityInfo,
    keys: EntityIdentity[],
    criteria?: any
  ): Observable<IEntityIdentitiesRef> {
    return callService<TModel, EntityIdentity[], IEntityIdentitiesRef>(
      'deleteManyByKeys',
      entityInfo,
      this.injector,
      service => service.deleteManyByKeys(entityInfo, keys, criteria),
      deletedKeys => ({ info: entityInfo, entityIdentities: deletedKeys })
    );
  }
}
