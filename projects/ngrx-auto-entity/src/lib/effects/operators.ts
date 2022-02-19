import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Create, CreateFailure, CreateMany, CreateManyFailure, CreateManySuccess, CreateSuccess } from '../actions/create-actions';
import { Delete, DeleteFailure, DeleteMany, DeleteManyFailure, DeleteManySuccess, DeleteSuccess } from '../actions/delete-actions';
import {
  DeleteByKey,
  DeleteByKeyFailure,
  DeleteByKeySuccess,
  DeleteManyByKeys,
  DeleteManyByKeysFailure,
  DeleteManyByKeysSuccess
} from '../actions/delete-by-key-actions';
import { Deselect, DeselectAll, Deselected, DeselectedMany, DeselectMany, DeselectManyByKeys } from '../actions/deselection-actions';
import { Change, Changed, Edit, EditByKey, Edited, EditedByKey, EditEnded, EditNew, EndEdit } from '../actions/edit-actions';
import { Load, LoadFailure, LoadSuccess } from '../actions/load-actions';
import { LoadAll, LoadAllFailure, LoadAllSuccess } from '../actions/load-all-actions';
import { LoadMany, LoadManyFailure, LoadManySuccess } from '../actions/load-many-actions';
import { LoadPage, LoadPageFailure, LoadPageSuccess } from '../actions/load-page-actions';
import { LoadRange, LoadRangeFailure, LoadRangeSuccess } from '../actions/load-range-actions';
import { Replace, ReplaceFailure, ReplaceMany, ReplaceManyFailure, ReplaceManySuccess, ReplaceSuccess } from '../actions/replace-actions';
import {
  Select,
  SelectByKey,
  Selected,
  SelectedMany,
  SelectedMore,
  SelectMany,
  SelectManyByKeys,
  SelectMore,
  SelectMoreByKeys
} from '../actions/selection-actions';
import { Update, UpdateFailure, UpdateMany, UpdateManyFailure, UpdateManySuccess, UpdateSuccess } from '../actions/update-actions';
import { Upsert, UpsertFailure, UpsertMany, UpsertManyFailure, UpsertManySuccess, UpsertSuccess } from '../actions/upsert-actions';
import { shouldApplyEffect } from '../decorators/entity-operators';
import { IEntityIdentitiesRef, IEntityIdentityRef, IEntityPageRef, IEntityRangeRef, IEntityRef } from '../service/refs';
import { NgrxAutoEntityService } from '../service/service';
import { IEntityError } from '../service/wrapper-models';

export const handleError = <TModel, TErrorAction>(
  error: IEntityError,
  errorAction: TErrorAction,
  methodName: string
): Observable<TErrorAction> => {
  if (error.err instanceof TypeError) {
    console.error(
      `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate required method (${methodName}) on the entity service configured for the ${error.info.modelName} entity.`,
      error.err
    );
  } else if (error.info && error.message) {
    console.error(
      `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations (${methodName}) on the entity service configured for the ${error.info.modelName} entity.`,
      error.message
    );
  } else if (error.message) {
    console.error(
      `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations (${methodName}) on the entity service configured for the ${error.info.modelName} entity.`,
      error.message
    );
  } else {
    console.error(error);
  }
  return of(errorAction);
};

/**
 * Rxjs operators that are intended to be called by client-defined Effects class
 */
@Injectable()
export class EntityOperators {
  constructor(private entityService: NgrxAutoEntityService) {}

  load<TModel>() {
    return (source: Observable<Load<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, keys, criteria, correlationId }) => {
          return this.entityService.load(info, keys, criteria).pipe(
            map((ref: IEntityRef<TModel>) => new LoadSuccess<TModel>(ref.info.modelType, ref.entity, keys, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(error, new LoadFailure<TModel>(error.info.modelType, error.err, keys, criteria, correlationId), 'load')
            )
          );
        })
      );
  }

  loadMany<TModel>() {
    return (source: Observable<LoadMany<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, criteria, correlationId }) => {
          return this.entityService.loadMany(info, criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => new LoadManySuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(error, new LoadManyFailure<TModel>(error.info.modelType, error.err, criteria, correlationId), 'loadMany')
            )
          );
        })
      );
  }

  loadAll<TModel>() {
    return (source: Observable<LoadAll<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, criteria, correlationId }) => {
          return this.entityService.loadAll(info, criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => new LoadAllSuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(error, new LoadAllFailure<TModel>(error.info.modelType, error.err, criteria, correlationId), 'loadAll')
            )
          );
        })
      );
  }

  loadPage<TModel>() {
    return (source: Observable<LoadPage<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, page, criteria, correlationId }) => {
          return this.entityService.loadPage(info, page, criteria).pipe(
            map(
              (ref: IEntityPageRef<TModel>) =>
                new LoadPageSuccess<TModel>(ref.info.modelType, ref.entity, ref.pageInfo, criteria, correlationId)
            ),
            catchError((error: IEntityError) =>
              handleError(error, new LoadPageFailure<TModel>(error.info.modelType, error.err, page, criteria, correlationId), 'loadPage')
            )
          );
        })
      );
  }

  loadRange<TModel>() {
    return (source: Observable<LoadRange<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, range, criteria, correlationId }) => {
          return this.entityService.loadRange(info, range, criteria).pipe(
            map(
              (ref: IEntityRangeRef<TModel>) =>
                new LoadRangeSuccess<TModel>(ref.info.modelType, ref.entity, ref.rangeInfo, criteria, correlationId)
            ),
            catchError((error: IEntityError) =>
              handleError(error, new LoadRangeFailure<TModel>(error.info.modelType, error.err, range, criteria, correlationId), 'loadRange')
            )
          );
        })
      );
  }

  create<TModel>() {
    return (source: Observable<Create<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entity, criteria, correlationId }) => {
          return this.entityService.create<TModel>(info, entity, criteria).pipe(
            map((ref: IEntityRef<TModel>) => new CreateSuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(error, new CreateFailure<TModel>(error.info.modelType, error.err, entity, criteria, correlationId), 'create')
            )
          );
        })
      );
  }

  createMany<TModel>() {
    return (source: Observable<CreateMany<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entities, criteria, correlationId }) => {
          return this.entityService.createMany<TModel>(info, entities, criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => new CreateManySuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(
                error,
                new CreateManyFailure<TModel>(error.info.modelType, error.err, entities, criteria, correlationId),
                'createMany'
              )
            )
          );
        })
      );
  }

  update<TModel>() {
    return (source: Observable<Update<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entity, criteria, correlationId }) => {
          return this.entityService.update<TModel>(info, entity, criteria).pipe(
            map((ref: IEntityRef<TModel>) => new UpdateSuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(error, new UpdateFailure<TModel>(error.info.modelType, error.err, entity, criteria, correlationId), 'update')
            )
          );
        })
      );
  }

  updateMany<TModel>() {
    return (source: Observable<UpdateMany<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entities, criteria, correlationId }) => {
          return this.entityService.updateMany<TModel>(info, entities, criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => new UpdateManySuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(
                error,
                new UpdateManyFailure<TModel>(error.info.modelType, error.err, entities, criteria, correlationId),
                'updateMany'
              )
            )
          );
        })
      );
  }

  upsert<TModel>() {
    return (source: Observable<Upsert<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entity, criteria, correlationId }) => {
          return this.entityService.upsert<TModel>(info, entity, criteria).pipe(
            map((ref: IEntityRef<TModel>) => new UpsertSuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(error, new UpsertFailure<TModel>(error.info.modelType, error.err, entity, criteria, correlationId), 'upsert')
            )
          );
        })
      );
  }

  upsertMany<TModel>() {
    return (source: Observable<UpsertMany<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entities, criteria, correlationId }) => {
          return this.entityService.upsertMany<TModel>(info, entities, criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => new UpsertManySuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(
                error,
                new UpsertManyFailure<TModel>(error.info.modelType, error.err, entities, criteria, correlationId),
                'upsertMany'
              )
            )
          );
        })
      );
  }

  replace<TModel>() {
    return (source: Observable<Replace<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entity, criteria, correlationId }) => {
          return this.entityService.replace<TModel>(info, entity, criteria).pipe(
            map((ref: IEntityRef<TModel>) => new ReplaceSuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(error, new ReplaceFailure<TModel>(error.info.modelType, error.err, entity, criteria, correlationId), 'replace')
            )
          );
        })
      );
  }

  replaceMany<TModel>() {
    return (source: Observable<ReplaceMany<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entities, criteria, correlationId }) => {
          return this.entityService.replaceMany<TModel>(info, entities, criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => new ReplaceManySuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(
                error,
                new ReplaceManyFailure<TModel>(error.info.modelType, error.err, entities, criteria, correlationId),
                'replaceMany'
              )
            )
          );
        })
      );
  }

  delete<TModel>() {
    return (source: Observable<Delete<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entity, criteria, correlationId }) => {
          return this.entityService.delete(info, entity, criteria).pipe(
            map((ref: IEntityRef<TModel>) => new DeleteSuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(error, new DeleteFailure<TModel>(error.info.modelType, error.err, entity, criteria, correlationId), 'delete')
            )
          );
        })
      );
  }

  deleteMany<TModel>() {
    return (source: Observable<DeleteMany<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, entities, criteria, correlationId }) => {
          return this.entityService.deleteMany<TModel>(info, entities, criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => new DeleteManySuccess<TModel>(ref.info.modelType, ref.entity, criteria, correlationId)),
            catchError((error: IEntityError) =>
              handleError(
                error,
                new DeleteManyFailure<TModel>(error.info.modelType, error.err, entities, criteria, correlationId),
                'deleteMany'
              )
            )
          );
        })
      );
  }

  deleteByKey<TModel>() {
    return (source: Observable<DeleteByKey<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, key, criteria, correlationId }) => {
          return this.entityService.deleteByKey<TModel>(info, key, criteria).pipe(
            map(
              (ref: IEntityIdentityRef) => new DeleteByKeySuccess<TModel>(ref.info.modelType, ref.entityIdentity, criteria, correlationId)
            ),
            catchError((error: IEntityError) =>
              handleError(
                error,
                new DeleteByKeyFailure<TModel>(error.info.modelType, error.err, key, criteria, correlationId),
                'deleteByKey'
              )
            )
          );
        })
      );
  }

  deleteManyByKey<TModel>() {
    return (source: Observable<DeleteManyByKeys<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        mergeMap(({ info, keys, criteria, correlationId }) => {
          return this.entityService.deleteManyByKey<TModel>(info, keys, criteria).pipe(
            map(
              (ref: IEntityIdentitiesRef) =>
                new DeleteManyByKeysSuccess<TModel>(ref.info.modelType, ref.entityIdentities, criteria, correlationId)
            ),
            catchError((error: IEntityError) =>
              handleError(
                error,
                new DeleteManyByKeysFailure<TModel>(error.info.modelType, error.err, keys, criteria, correlationId),
                'deleteManyByKey'
              )
            )
          );
        })
      );
  }

  select<TModel>() {
    return (source: Observable<Select<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entity, correlationId }) => new Selected<TModel>(info.modelType, entity, correlationId))
      );
  }

  selectByKey<TModel>() {
    return (source: Observable<SelectByKey<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entityKey, correlationId }) => new Selected<TModel>(info.modelType, entityKey, correlationId))
      );
  }

  selectMany<TModel>() {
    return (source: Observable<SelectMany<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entities, correlationId }) => new SelectedMany<TModel>(info.modelType, entities, correlationId))
      );
  }

  selectMore<TModel>() {
    return (source: Observable<SelectMore<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entities, correlationId }) => new SelectedMore<TModel>(info.modelType, entities, correlationId))
      );
  }

  selectManyByKeys<TModel>() {
    return (source: Observable<SelectManyByKeys<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entitiesKeys, correlationId }) => new SelectedMany<TModel>(info.modelType, entitiesKeys, correlationId))
      );
  }

  selectMoreByKeys<TModel>() {
    return (source: Observable<SelectMoreByKeys<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entitiesKeys, correlationId }) => new SelectedMore<TModel>(info.modelType, entitiesKeys, correlationId))
      );
  }

  deselect<TModel>() {
    return (source: Observable<Deselect<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, correlationId }) => new Deselected<TModel>(info.modelType, correlationId))
      );
  }

  deselectMany<TModel>() {
    return (source: Observable<DeselectMany<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entities, correlationId }) => new DeselectedMany<TModel>(info.modelType, entities, correlationId))
      );
  }

  deselectManyByKeys<TModel>() {
    return (source: Observable<DeselectManyByKeys<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entitiesKeys, correlationId }) => new DeselectedMany<TModel>(info.modelType, entitiesKeys, correlationId))
      );
  }

  deselectAll<TModel>() {
    return (source: Observable<DeselectAll<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, correlationId }) => new DeselectedMany<TModel>(info.modelType, null, correlationId))
      );
  }

  editNew<TModel>() {
    return (source: Observable<EditNew<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entity, correlationId }) => new Edited<TModel>(info.modelType, entity, correlationId))
      );
  }

  edit<TModel>() {
    return (source: Observable<Edit<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entity, correlationId }) => new Edited<TModel>(info.modelType, entity, correlationId))
      );
  }

  editByKey<TModel>() {
    return (source: Observable<EditByKey<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, key, correlationId }) => new EditedByKey<TModel>(info.modelType, key, correlationId))
      );
  }

  change<TModel>() {
    return (source: Observable<Change<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entity, correlationId }) => new Changed<TModel>(info.modelType, entity, correlationId))
      );
  }

  endEdit<TModel>() {
    return (source: Observable<EndEdit<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, correlationId }) => new EditEnded<TModel>(info.modelType, correlationId))
      );
  }
}
