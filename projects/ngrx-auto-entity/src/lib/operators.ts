import { Injectable } from '@angular/core';
import { pascalCase } from 'change-case';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
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
} from './actions';
import { IEntityError, IEntityPageRef, IEntityRangeRef, IEntityRef, NgrxAutoEntityService } from './service';

/**
 * Rxjs operators that are intended to be called by client-defined Effects class
 */
@Injectable()
export class EntityOperators {
  constructor(private entityService: NgrxAutoEntityService) {}

  load<TModel>() {
    return (source: Observable<Load<TModel>>) =>
      source.pipe(
        exhaustMap(action => {
          console.log('[NGRX-AE] Load effect');
          return this.entityService.load(action.info, action.keys, action.criteria).pipe(
            map((ref: IEntityRef<TModel>) => {
              return new LoadSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] NgRxAutoEntityService Error: Unable to locate load method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new LoadFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  loadAll<TModel>() {
    return (source: Observable<LoadAll<TModel>>) =>
      source.pipe(
        exhaustMap(action => {
          console.log('[NGRX-AE] Load all effect');
          return this.entityService.loadAll(action.info, action.criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => {
              return new LoadAllSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] NgRxAutoEntityService Error: Unable to locate loadAll method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new LoadAllFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  loadPage<TModel>() {
    return (source: Observable<LoadPage<TModel>>) =>
      source.pipe(
        exhaustMap((action: LoadPage<TModel>) => {
          console.log('[NGRX-AE] Load page effect');
          return this.entityService.loadPage(action.info, action.page, action.criteria).pipe(
            map((ref: IEntityPageRef<TModel>) => {
              return new LoadPageSuccess<TModel>(ref.info.modelType, ref.entity, ref.pageInfo);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] NgRxAutoEntityService Error: Unable to locate loadPage method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new LoadPageFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  loadRange<TModel>() {
    return (source: Observable<LoadRange<TModel>>) =>
      source.pipe(
        exhaustMap((action: LoadRange<TModel>) => {
          console.log('[NGRX-AE] Load range effect');
          return this.entityService.loadRange(action.info, action.range, action.criteria).pipe(
            map((ref: IEntityRangeRef<TModel>) => {
              return new LoadRangeSuccess<TModel>(ref.info.modelType, ref.entity, ref.rangeInfo);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] NgRxAutoEntityService Error: Unable to locate loadRange method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new LoadRangeFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  create<TModel>() {
    return (source: Observable<Create<TModel>>) =>
      source.pipe(
        exhaustMap((action: Create<TModel>) => {
          console.log('[NGRX-AE] Create effect');
          return this.entityService.create<TModel>(action.info, action.entity).pipe(
            map((ref: IEntityRef<TModel>) => {
              return new CreateSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] NgRxAutoEntityService Error: Unable to locate create method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new CreateFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  update<TModel>() {
    return (source: Observable<Update<TModel>>) =>
      source.pipe(
        exhaustMap((action: Update<TModel>) => {
          console.log('[NGRX-AE] Update effect');
          return this.entityService.update<TModel>(action.info, action.entity).pipe(
            map((ref: IEntityRef<TModel>) => {
              return new UpdateSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] NgRxAutoEntityService Error: Unable to locate update method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new UpdateFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  delete<TModel>() {
    return (source: Observable<Delete<TModel>>) =>
      source.pipe(
        exhaustMap(action => {
          console.log('[NGRX-AE] Delete effect');
          return this.entityService.delete(action.info, action.entity).pipe(
            map((ref: IEntityRef<TModel>) => {
              return new DeleteSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] NgRxAutoEntityService Error: Unable to locate delete method in the ${serviceName}`,
                  error.err
                );
              } else {
                console.error(error.err);
              }
              return of(new DeleteFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }
}
