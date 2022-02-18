import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

@Injectable()
export class ExtraEffects {
  select$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Select), this.ops.select()));

  selectByKey$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.SelectByKey), this.ops.selectByKey()));

  selectMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.SelectMany), this.ops.selectMany()));

  selectMore$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.SelectMore), this.ops.selectMore()));

  selectManyByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.SelectManyByKeys), this.ops.selectManyByKeys())
  );

  selectMoreByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.SelectMoreByKeys), this.ops.selectMoreByKeys())
  );

  deselect$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Deselect), this.ops.deselect()));

  deselectMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.DeselectMany), this.ops.deselectMany()));

  deselectManyByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction(EntityActionTypes.DeselectManyByKeys), this.ops.deselectManyByKeys())
  );

  deselectAll$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.DeselectAll), this.ops.deselectAll()));

  editNew$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.EditNew), this.ops.editNew()));

  edit$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Edit), this.ops.edit()));

  editByKey$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.EditByKey), this.ops.editByKey()));

  change$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Change), this.ops.change()));

  endEdit$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.EndEdit), this.ops.endEdit()));

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
