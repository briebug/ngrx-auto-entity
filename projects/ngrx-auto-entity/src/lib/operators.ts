import { Injectable } from '@angular/core';
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
  LoadFailure,
  LoadMany,
  LoadManyFailure,
  LoadManySuccess,
  LoadSuccess,
  Update,
  UpdateFailure,
  UpdateSuccess
} from './ngrx-auto-entity.actions';
import { IEntityError, IEntityRef, NgrxAutoEntityService } from './ngrx-auto-entity.service';

@Injectable()
export class EntityOperators {
  constructor(private entityService: NgrxAutoEntityService) {}

  load<TModel>() {
    return (source: Observable<Load<TModel>>) =>
      source.pipe(
        switchMap(action => this.entityService.load(action.info, action.keys)),
        map((ref: IEntityRef<TModel>) => new LoadSuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: IEntityError<TModel>) => of(new LoadFailure<TModel>(error.info.modelType, error.err)))
      );
  }

  loadMany<TModel>() {
    return (source: Observable<LoadMany<TModel>>) =>
      source.pipe(
        switchMap((action: LoadMany<TModel>) => this.entityService.loadMany(action.info, action.page, action.size)),
        map((ref: IEntityRef<TModel[]>) => new LoadManySuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: any) => of(new LoadManyFailure<TModel>(error.info.modelType, error.err)))
      );
  }

  create<TModel>() {
    return (source: Observable<Create<TModel>>) =>
      source.pipe(
        switchMap((action: Create<TModel>) => this.entityService.create<TModel>(action.info, action.entity)),
        map((ref: IEntityRef<TModel>) => new CreateSuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: IEntityError<TModel>) => of(new CreateFailure<TModel>(error.info.modelType, error.err)))
      );
  }

  update<TModel>() {
    return (source: Observable<Update<TModel>>) =>
      source.pipe(
        switchMap((action: Update<TModel>) => this.entityService.update<TModel>(action.info, action.entity)),
        map((ref: IEntityRef<TModel>) => new UpdateSuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: IEntityError<TModel>) => of(new UpdateFailure<TModel>(error.info.modelType, error.err)))
      );
  }

  delete<TModel>() {
    return (source: Observable<Delete<TModel>>) =>
      source.pipe(
        switchMap(action => this.entityService.delete(action.info, action.entity)),
        map((ref: IEntityRef<TModel>) => new DeleteSuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: IEntityError<TModel>) => of(new DeleteFailure<TModel>(error.info.modelType, error.err)))
      );
  }
}
