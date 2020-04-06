import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

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
export class CreateManyEffect {
  @Effect()
  createMany$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.CreateMany),
    this.ops.createMany()
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
export class UpdateManyEffect {
  @Effect()
  updateMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.UpdateMany),
    this.ops.updateMany()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class UpsertEffect {
  @Effect()
  update$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Upsert),
    this.ops.upsert()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class UpsertManyEffect {
  @Effect()
  updateMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.UpsertMany),
    this.ops.upsertMany()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class ReplaceEffect {
  @Effect()
  replace$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Replace),
    this.ops.replace()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class ReplaceManyEffect {
  @Effect()
  replaceMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.ReplaceMany),
    this.ops.replaceMany()
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
export class DeleteManyEffect {
  @Effect()
  deleteMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteMany),
    this.ops.deleteMany()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class DeleteByKeyEffect {
  @Effect()
  deleteByKey$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteByKey),
    this.ops.deleteByKey()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class DeleteManyByKeysEffect {
  @Effect()
  deleteManyByKeys$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteManyByKeys),
    this.ops.deleteManyByKey()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
