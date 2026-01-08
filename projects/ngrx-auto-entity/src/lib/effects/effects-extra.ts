import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';
import { Deselect, DeselectAll, DeselectMany, DeselectManyByKeys } from '../actions/deselection-actions';
import { Select, SelectByKey, SelectMany, SelectManyByKeys, SelectMore, SelectMoreByKeys } from '../actions/selection-actions';
import { Change, Edit, EditByKey, EditNew, EndEdit } from '../actions/edit-actions';

@Injectable()
export class ExtraEffects {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  select$ = createEffect(() => this.actions$.pipe(ofEntityAction<Select<unknown>>(EntityActionTypes.Select), this.ops.select()));

  selectByKey$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<SelectByKey<unknown>>(EntityActionTypes.SelectByKey), this.ops.selectByKey())
  );

  selectMany$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<SelectMany<unknown>>(EntityActionTypes.SelectMany), this.ops.selectMany())
  );

  selectMore$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<SelectMore<unknown>>(EntityActionTypes.SelectMore), this.ops.selectMore())
  );

  selectManyByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<SelectManyByKeys<unknown>>(EntityActionTypes.SelectManyByKeys), this.ops.selectManyByKeys())
  );

  selectMoreByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<SelectMoreByKeys<unknown>>(EntityActionTypes.SelectMoreByKeys), this.ops.selectMoreByKeys())
  );

  deselect$ = createEffect(() => this.actions$.pipe(ofEntityAction<Deselect<unknown>>(EntityActionTypes.Deselect), this.ops.deselect()));

  deselectMany$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<DeselectMany<unknown>>(EntityActionTypes.DeselectMany), this.ops.deselectMany())
  );

  deselectManyByKeys$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<DeselectManyByKeys<unknown>>(EntityActionTypes.DeselectManyByKeys), this.ops.deselectManyByKeys())
  );

  deselectAll$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<DeselectAll<unknown>>(EntityActionTypes.DeselectAll), this.ops.deselectAll())
  );

  editNew$ = createEffect(() => this.actions$.pipe(ofEntityAction<EditNew<unknown>>(EntityActionTypes.EditNew), this.ops.editNew()));

  edit$ = createEffect(() => this.actions$.pipe(ofEntityAction<Edit<unknown>>(EntityActionTypes.Edit), this.ops.edit()));

  editByKey$ = createEffect(() =>
    this.actions$.pipe(ofEntityAction<EditByKey<unknown>>(EntityActionTypes.EditByKey), this.ops.editByKey())
  );

  change$ = createEffect(() => this.actions$.pipe(ofEntityAction<Change<unknown>>(EntityActionTypes.Change), this.ops.change()));

  endEdit$ = createEffect(() => this.actions$.pipe(ofEntityAction<EndEdit<unknown>>(EntityActionTypes.EndEdit), this.ops.endEdit()));
}
