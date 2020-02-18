import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { pascalCase } from '../../util/case';
import {
  Change,
  Changed,
  Create,
  CreateFailure,
  CreateMany,
  CreateManyFailure,
  CreateManySuccess,
  CreateSuccess,
  Delete,
  DeleteByKey,
  DeleteByKeyFailure,
  DeleteByKeySuccess,
  DeleteFailure,
  DeleteMany,
  DeleteManyByKeys,
  DeleteManyByKeysFailure,
  DeleteManyByKeysSuccess,
  DeleteManyFailure,
  DeleteManySuccess,
  DeleteSuccess,
  Deselect,
  DeselectAll,
  Deselected,
  DeselectedMany,
  DeselectMany,
  DeselectManyByKeys,
  Edit,
  Edited,
  EditEnded,
  EndEdit,
  Load,
  LoadAll,
  LoadAllFailure,
  LoadAllSuccess,
  LoadFailure,
  LoadMany,
  LoadManyFailure,
  LoadManySuccess,
  LoadPage,
  LoadPageFailure,
  LoadPageSuccess,
  LoadRange,
  LoadRangeFailure,
  LoadRangeSuccess,
  LoadSuccess,
  Replace,
  ReplaceFailure,
  ReplaceMany,
  ReplaceManyFailure,
  ReplaceManySuccess,
  ReplaceSuccess,
  Select,
  SelectByKey,
  Selected,
  SelectedMany,
  SelectedMore,
  SelectMany,
  SelectManyByKeys,
  SelectMore,
  SelectMoreByKeys,
  Update,
  UpdateFailure,
  UpdateMany,
  UpdateManyFailure,
  UpdateManySuccess,
  UpdateSuccess
} from '../actions/actions';
import { shouldApplyEffect } from '../decorators/entity-operators';
import { IEntityIdentitiesRef, IEntityIdentityRef, IEntityPageRef, IEntityRangeRef, IEntityRef } from '../service/refs';
import { NgrxAutoEntityService } from '../service/service';
import { IEntityError } from '../service/wrapper-models';

export const handleError = <TModel, TErrorAction>(
  error: IEntityError<TModel>,
  errorAction: TErrorAction
): Observable<TErrorAction> => {
  const serviceName = `${pascalCase(error.info.modelName)}Service`;
  if (error.err instanceof TypeError) {
    console.error(
      `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate load method in the ${serviceName}`,
      error.err
    );
  } else if (error.info && error.message) {
    console.error(
      `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations on the ${serviceName}`,
      error.message
    );
  } else if (error.message) {
    console.error(
      `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations on entity service`,
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
            map((ref: IEntityRef<TModel>) => new LoadSuccess<TModel>(ref.info.modelType, ref.entity, correlationId)),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new LoadFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map(
              (ref: IEntityRef<TModel[]>) => new LoadAllSuccess<TModel>(ref.info.modelType, ref.entity, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new LoadAllFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map(
              (ref: IEntityRef<TModel[]>) => new LoadManySuccess<TModel>(ref.info.modelType, ref.entity, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new LoadManyFailure<TModel>(error.info.modelType, error.err, correlationId))
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
                new LoadPageSuccess<TModel>(ref.info.modelType, ref.entity, ref.pageInfo, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new LoadPageFailure<TModel>(error.info.modelType, error.err, correlationId))
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
                new LoadRangeSuccess<TModel>(ref.info.modelType, ref.entity, ref.rangeInfo, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new LoadRangeFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map((ref: IEntityRef<TModel>) => new CreateSuccess<TModel>(ref.info.modelType, ref.entity, correlationId)),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new CreateFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map(
              (ref: IEntityRef<TModel[]>) =>
                new CreateManySuccess<TModel>(ref.info.modelType, ref.entity, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new CreateManyFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map((ref: IEntityRef<TModel>) => new UpdateSuccess<TModel>(ref.info.modelType, ref.entity, correlationId)),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new UpdateFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map(
              (ref: IEntityRef<TModel[]>) =>
                new UpdateManySuccess<TModel>(ref.info.modelType, ref.entity, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new UpdateManyFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map((ref: IEntityRef<TModel>) => new ReplaceSuccess<TModel>(ref.info.modelType, ref.entity, correlationId)),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new ReplaceFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map(
              (ref: IEntityRef<TModel[]>) =>
                new ReplaceManySuccess<TModel>(ref.info.modelType, ref.entity, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new ReplaceManyFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map((ref: IEntityRef<TModel>) => new DeleteSuccess<TModel>(ref.info.modelType, ref.entity, correlationId)),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new DeleteFailure<TModel>(error.info.modelType, error.err, correlationId))
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
            map(
              (ref: IEntityRef<TModel[]>) =>
                new DeleteManySuccess<TModel>(ref.info.modelType, ref.entity, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new DeleteManyFailure<TModel>(error.info.modelType, error.err, correlationId))
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
              (ref: IEntityIdentityRef) =>
                new DeleteByKeySuccess<TModel>(ref.info.modelType, ref.entityIdentity, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new DeleteByKeyFailure<TModel>(error.info.modelType, error.err, correlationId))
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
                new DeleteManyByKeysSuccess<TModel>(ref.info.modelType, ref.entityIdentities, correlationId)
            ),
            catchError((error: IEntityError<TModel>) =>
              handleError(error, new DeleteManyByKeysFailure<TModel>(error.info.modelType, error.err, correlationId))
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
        map(
          ({ info, entitiesKeys, correlationId }) =>
            new SelectedMany<TModel>(info.modelType, entitiesKeys, correlationId)
        )
      );
  }

  selectMoreByKeys<TModel>() {
    return (source: Observable<SelectMoreByKeys<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(
          ({ info, entitiesKeys, correlationId }) =>
            new SelectedMore<TModel>(info.modelType, entitiesKeys, correlationId)
        )
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
        map(
          ({ info, entitiesKeys, correlationId }) =>
            new DeselectedMany<TModel>(info.modelType, entitiesKeys, correlationId)
        )
      );
  }

  deselectAll<TModel>() {
    return (source: Observable<DeselectAll<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, correlationId }) => new DeselectedMany<TModel>(info.modelType, null, correlationId))
      );
  }

  edit<TModel>() {
    return (source: Observable<Edit<TModel>>) =>
      source.pipe(
        shouldApplyEffect(),
        map(({ info, entity, correlationId }) => new Edited<TModel>(info.modelType, entity, correlationId))
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
