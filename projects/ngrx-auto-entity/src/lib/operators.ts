import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  Create,
  CreateFailure,
  CreateSuccess,
  Delete,
  DeleteFailure,
  DeleteSuccess,
  Load,
  LoadFailure,
  LoadSuccess,
  LoadMany,
  LoadManyFailure,
  LoadManySuccess,
  Update,
  UpdateFailure,
  UpdateSuccess
} from './ngrx-auto-entity.actions';
import { EntityError, EntityRef, NgrxAutoEntityService } from './ngrx-auto-entity.service';

@Injectable()
export class EntityOperators {
  constructor(private entityService: NgrxAutoEntityService) {}

  load<TModel>() {
    return (source: Observable<Load<TModel>>) =>
      source.pipe(
        switchMap(action => this.entityService.load(action.info, action.keys)),
        map((ref: EntityRef<TModel>) => new LoadSuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: EntityError<TModel>) => of(new LoadFailure<TModel>(error.info.modelType, error.err)))
      );
  }

  loadMany<TModel>() {
    return (source: Observable<LoadMany<TModel>>) =>
      source.pipe(
        switchMap((action: LoadMany<TModel>) => this.entityService.loadMany(action.info, action.page, action.size)),
        map((ref: EntityRef<TModel[]>) => new LoadManySuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: any) => of(new LoadManyFailure<TModel>(error.info.modelType, error.err)))
      );
  }

  create<TModel>() {
    return (source: Observable<Create<TModel>>) =>
      source.pipe(
        switchMap((action: Create<TModel>) => this.entityService.create<TModel>(action.info, action.entity)),
        map((ref: EntityRef<TModel>) => new CreateSuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: EntityError<TModel>) => of(new CreateFailure<TModel>(error.info.modelType, error.err)))
      );
  }

  update<TModel>() {
    return (source: Observable<Update<TModel>>) =>
      source.pipe(
        switchMap((action: Update<TModel>) => this.entityService.update<TModel>(action.info, action.entity)),
        map((ref: EntityRef<TModel>) => new UpdateSuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: EntityError<TModel>) => of(new UpdateFailure<TModel>(error.info.modelType, error.err)))
      );
  }

  delete<TModel>() {
    return (source: Observable<Delete<TModel>>) =>
      source.pipe(
        switchMap(action => this.entityService.delete(action.info, action.keys)),
        map((ref: EntityRef<TModel>) => new DeleteSuccess<TModel>(ref.info.modelType, ref.entity)),
        catchError((error: EntityError<TModel>) => of(new DeleteFailure<TModel>(error.info.modelType, error.err)))
      );
  }
}
