import { Injectable } from '@angular/core';
import { pascalCase } from 'change-case';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  Create,
  CreateFailure,
  CreateMany,
  CreateManyFailure,
  CreateManySuccess,
  CreateSuccess,
  Delete,
  DeleteFailure,
  DeleteMany,
  DeleteManyFailure,
  DeleteManySuccess,
  DeleteSuccess,
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
  Update,
  UpdateFailure,
  UpdateMany,
  UpdateManyFailure,
  UpdateManySuccess,
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
        mergeMap(action => {
          console.log('[NGRX-AE] Load effect');
          return this.entityService.load(action.info, action.keys, action.criteria).pipe(
            map((ref: IEntityRef<TModel>) => {
              return new LoadSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate load method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new LoadFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  loadAll<TModel>() {
    return (source: Observable<LoadAll<TModel>>) =>
      source.pipe(
        mergeMap(action => {
          console.log('[NGRX-AE] Load all effect');
          return this.entityService.loadAll(action.info, action.criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => {
              return new LoadAllSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate loadAll method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new LoadAllFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  loadMany<TModel>() {
    return (source: Observable<LoadMany<TModel>>) =>
      source.pipe(
        mergeMap((action: LoadMany<TModel>) => {
          console.log('[NGRX-AE] Load many effect');
          return this.entityService.loadMany(action.info, action.criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => {
              return new LoadManySuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate loadMany method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new LoadManyFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  loadPage<TModel>() {
    return (source: Observable<LoadPage<TModel>>) =>
      source.pipe(
        mergeMap((action: LoadPage<TModel>) => {
          console.log('[NGRX-AE] Load page effect');
          return this.entityService.loadPage(action.info, action.page, action.criteria).pipe(
            map((ref: IEntityPageRef<TModel>) => {
              return new LoadPageSuccess<TModel>(ref.info.modelType, ref.entity, ref.pageInfo);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate loadPage method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new LoadPageFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  loadRange<TModel>() {
    return (source: Observable<LoadRange<TModel>>) =>
      source.pipe(
        mergeMap((action: LoadRange<TModel>) => {
          console.log('[NGRX-AE] Load range effect');
          return this.entityService.loadRange(action.info, action.range, action.criteria).pipe(
            map((ref: IEntityRangeRef<TModel>) => {
              return new LoadRangeSuccess<TModel>(ref.info.modelType, ref.entity, ref.rangeInfo);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate loadRange method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new LoadRangeFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  create<TModel>() {
    return (source: Observable<Create<TModel>>) =>
      source.pipe(
        mergeMap((action: Create<TModel>) => {
          console.log('[NGRX-AE] Create effect');
          return this.entityService.create<TModel>(action.info, action.entity).pipe(
            map((ref: IEntityRef<TModel>) => {
              return new CreateSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate create method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new CreateFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  createMany<TModel>() {
    return (source: Observable<CreateMany<TModel>>) =>
      source.pipe(
        mergeMap((action: CreateMany<TModel>) => {
          console.log('[NGRX-AE] Create Many effect');
          return this.entityService.createMany<TModel>(action.info, action.entities, action.criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => {
              return new CreateManySuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate createMany method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new CreateManyFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  update<TModel>() {
    return (source: Observable<Update<TModel>>) =>
      source.pipe(
        mergeMap((action: Update<TModel>) => {
          console.log('[NGRX-AE] Update effect');
          return this.entityService.update<TModel>(action.info, action.entity, action.criteria).pipe(
            map((ref: IEntityRef<TModel>) => {
              return new UpdateSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate update method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new UpdateFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  updateMany<TModel>() {
    return (source: Observable<UpdateMany<TModel>>) =>
      source.pipe(
        mergeMap((action: UpdateMany<TModel>) => {
          console.log('[NGRX-AE] Update effect');
          return this.entityService.updateMany<TModel>(action.info, action.entities, action.criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => {
              return new UpdateManySuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate updateMany method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new UpdateManyFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  replace<TModel>() {
    return (source: Observable<Replace<TModel>>) =>
      source.pipe(
        mergeMap((action: Replace<TModel>) => {
          console.log('[NGRX-AE] Replace effect');
          return this.entityService.replace<TModel>(action.info, action.entity).pipe(
            map((ref: IEntityRef<TModel>) => {
              return new ReplaceSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate replace method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new ReplaceFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  replaceMany<TModel>() {
    return (source: Observable<ReplaceMany<TModel>>) =>
      source.pipe(
        mergeMap((action: ReplaceMany<TModel>) => {
          console.log('[NGRX-AE] Replace Many effect');
          return this.entityService.replaceMany<TModel>(action.info, action.entities, action.criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => {
              return new ReplaceManySuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate replaceMany method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new ReplaceManyFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  delete<TModel>() {
    return (source: Observable<Delete<TModel>>) =>
      source.pipe(
        mergeMap(action => {
          console.log('[NGRX-AE] Delete effect');
          return this.entityService.delete(action.info, action.entity).pipe(
            map((ref: IEntityRef<TModel>) => {
              return new DeleteSuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate delete method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations on ${serviceName}`,
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
              return of(new DeleteFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }

  deleteMany<TModel>() {
    return (source: Observable<DeleteMany<TModel>>) =>
      source.pipe(
        mergeMap((action: DeleteMany<TModel>) => {
          console.log('[NGRX-AE] Delete Many effect');
          return this.entityService.deleteMany<TModel>(action.info, action.entities, action.criteria).pipe(
            map((ref: IEntityRef<TModel[]>) => {
              return new DeleteManySuccess<TModel>(ref.info.modelType, ref.entity);
            }),
            catchError((error: IEntityError<TModel>) => {
              if (error.err instanceof TypeError) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
                console.error(
                  `[NGRX-AE] ! NgRxAutoEntityService Error: Unable to locate deleteMany method in the ${serviceName}`,
                  error.err
                );
              } else if (error.info && error.message) {
                const serviceName = `${pascalCase(error.info.modelName)}Service`;
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
              return of(new DeleteManyFailure<TModel>(error.info.modelType, error.err));
            })
          );
        })
      );
  }
}
