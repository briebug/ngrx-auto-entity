import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CreateFailure,
  CreateSuccess,
  DeleteFailure,
  DeleteSuccess,
  EntityActionTypes,
  LoadAllFailure,
  LoadAllSuccess,
  LoadFailure,
  LoadPageFailure,
  LoadPageSuccess,
  LoadRangeFailure,
  LoadRangeSuccess,
  LoadSuccess,
  ofEntityAction,
  UpdateFailure,
  UpdateSuccess
} from './actions';
import { EntityOperators } from './operators';

@Injectable()
export class DefaultEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Load),
    this.ops.load()
  );

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadAll),
    this.ops.loadAll()
  );

  @Effect()
  loadPage$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadPage),
    this.ops.loadPage()
  );

  @Effect()
  loadRange$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadRange),
    this.ops.loadRange()
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Create),
    this.ops.create()
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Update),
    this.ops.update()
  );

  // @Effect()
  // replace$ = this.actions$.pipe(
  //   ofEntityAction(EntityActionTypes.Replace),
  //   this.ops.update()
  // );

  @Effect()
  delete$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Delete),
    this.ops.delete()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class LoadEffect {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Load),
    this.ops.load()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class LoadAllEffect {
  @Effect()
  loadAll$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadAll),
    this.ops.loadAll()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class LoadPageEffect {
  @Effect()
  loadPage$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadPage),
    this.ops.loadPage()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class LoadRangeEffect {
  @Effect()
  loadRange$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadRange),
    this.ops.loadRange()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class LoadEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Load),
    this.ops.load()
  );

  @Effect()
  loadAll$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadAll),
    this.ops.loadAll()
  );

  @Effect()
  loadPage$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadPage),
    this.ops.loadPage()
  );

  @Effect()
  loadRange$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadRange),
    this.ops.loadRange()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class CreateEffect {
  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Create),
    this.ops.create()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class UpdateEffect {
  @Effect()
  update$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Update),
    this.ops.update()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class DeleteEffect {
  @Effect()
  delete$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Delete),
    this.ops.delete()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class CUDEffects {
  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Create),
    this.ops.create()
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Update),
    this.ops.update()
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Delete),
    this.ops.delete()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
