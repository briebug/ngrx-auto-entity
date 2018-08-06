import { Injectable } from '@angular/core';
import { pascalCase } from 'change-case';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  Create,
  CreateFailure,
  CreateSuccess,
  Delete,
  DeleteFailure,
  DeleteSuccess,
  Load,
  LoadAll,
  LoadAllFailure,
  LoadAllSuccess,
  LoadFailure,
  LoadPage,
  LoadPageFailure,
  LoadPageSuccess,
  LoadRange,
  LoadRangeFailure,
  LoadRangeSuccess,
  LoadSuccess,
  Update,
  UpdateFailure,
  UpdateSuccess
} from './ngrx-auto-entity.actions';
import {
  IEntityError,
  IEntityPageRef,
  IEntityRangeRef,
  IEntityRef,
  NgrxAutoEntityService
} from './ngrx-auto-entity.service';

/**
 * Rxjs operators that are intended to be called by client-defined Effects class
 */
@Injectable()
export class EntityOperators {
  constructor(private entityService: NgrxAutoEntityService) {}

  load<TModel>() {
    return (source: Observable<Load<TModel>>) =>
      source.pipe(
        switchMap(action =>
          this.entityService.load(action.info, action.keys, action.relationKeys).pipe(
            map((ref: IEntityRef<TModel>) => new LoadSuccess<TModel>(ref.info.modelType, ref.entity)),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `NgRxAutoEntityService Error: Unable to locate load method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new LoadFailure<TModel>(error.info.modelType, error.err));
            })
          )
        )
      );
  }

  loadAll<TModel>() {
    return (source: Observable<LoadAll<TModel>>) =>
      source.pipe(
        switchMap(action =>
          this.entityService.loadAll(action.info, action.relationKeys).pipe(
            map((ref: IEntityRef<TModel[]>) => new LoadAllSuccess<TModel>(ref.info.modelType, ref.entity)),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `NgRxAutoEntityService Error: Unable to locate loadAll method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new LoadAllFailure<TModel>(error.info.modelType, error.err));
            })
          )
        )
      );
  }

  loadPage<TModel>() {
    return (source: Observable<LoadPage<TModel>>) =>
      source.pipe(
        switchMap((action: LoadPage<TModel>) =>
          this.entityService.loadPage(action.info, action.page, action.relationKeys).pipe(
            map(
              (ref: IEntityPageRef<TModel>) => new LoadPageSuccess<TModel>(ref.info.modelType, ref.entity, ref.pageInfo)
            ),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `NgRxAutoEntityService Error: Unable to locate loadPage method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new LoadPageFailure<TModel>(error.info.modelType, error.err));
            })
          )
        )
      );
  }

  loadRange<TModel>() {
    return (source: Observable<LoadRange<TModel>>) =>
      source.pipe(
        switchMap((action: LoadRange<TModel>) =>
          this.entityService.loadRange(action.info, action.range, action.relationKeys).pipe(
            map(
              (ref: IEntityRangeRef<TModel>) =>
                new LoadRangeSuccess<TModel>(ref.info.modelType, ref.entity, ref.rangeInfo)
            ),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `NgRxAutoEntityService Error: Unable to locate loadRange method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new LoadRangeFailure<TModel>(error.info.modelType, error.err));
            })
          )
        )
      );
  }

  create<TModel>() {
    return (source: Observable<Create<TModel>>) =>
      source.pipe(
        switchMap((action: Create<TModel>) =>
          this.entityService.create<TModel>(action.info, action.entity).pipe(
            map((ref: IEntityRef<TModel>) => new CreateSuccess<TModel>(ref.info.modelType, ref.entity)),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `NgRxAutoEntityService Error: Unable to locate create method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new CreateFailure<TModel>(error.info.modelType, error.err));
            })
          )
        )
      );
  }

  update<TModel>() {
    return (source: Observable<Update<TModel>>) =>
      source.pipe(
        switchMap((action: Update<TModel>) =>
          this.entityService.update<TModel>(action.info, action.entity).pipe(
            map((ref: IEntityRef<TModel>) => new UpdateSuccess<TModel>(ref.info.modelType, ref.entity)),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `NgRxAutoEntityService Error: Unable to locate update method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new UpdateFailure<TModel>(error.info.modelType, error.err));
            })
          )
        )
      );
  }

  delete<TModel>() {
    return (source: Observable<Delete<TModel>>) =>
      source.pipe(
        switchMap(action =>
          this.entityService.delete(action.info, action.entity).pipe(
            map((ref: IEntityRef<TModel>) => new DeleteSuccess<TModel>(ref.info.modelType, ref.entity)),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `NgRxAutoEntityService Error: Unable to locate delete method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new DeleteFailure<TModel>(error.info.modelType, error.err));
            })
          )
        )
      );
  }
}
