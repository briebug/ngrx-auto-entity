import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

@Injectable()
export class ExtraEffects {
  @Effect()
  select$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Select),
    this.ops.select()
  );

  @Effect()
  selectByKey$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectByKey),
    this.ops.selectByKey()
  );

  @Effect()
  selectMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectMany),
    this.ops.selectMany()
  );

  @Effect()
  selectMore$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectMore),
    this.ops.selectMore()
  );

  @Effect()
  selectManyByKeys$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectManyByKeys),
    this.ops.selectManyByKeys()
  );

  @Effect()
  selectMoreByKeys$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectMoreByKeys),
    this.ops.selectMoreByKeys()
  );

  @Effect()
  deselect$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Deselect),
    this.ops.deselect()
  );

  @Effect()
  deselectMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeselectMany),
    this.ops.deselectMany()
  );

  @Effect()
  deselectManyByKeys$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeselectManyByKeys),
    this.ops.deselectManyByKeys()
  );

  @Effect()
  deselectAll$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeselectAll),
    this.ops.deselectAll()
  );

  @Effect()
  editNew$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.EditNew),
    this.ops.editNew()
  );

  @Effect()
  edit$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Edit),
    this.ops.edit()
  );

  @Effect()
  editByKey$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.EditByKey),
    this.ops.editByKey()
  );

  @Effect()
  change$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Change),
    this.ops.change()
  );

  @Effect()
  endEdit$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.EndEdit),
    this.ops.endEdit()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
