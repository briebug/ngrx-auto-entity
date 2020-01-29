import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityActionTypes, ofEntityAction } from './actions';
import { EntityOperators } from './operators';

/**
 * Fully-featured entity effects class that provides all standard
 * effect handling for all CURDL operations.
 */
@Injectable()
export class EntityEffects {
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
  loadMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadMany),
    this.ops.loadMany()
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
  createMany$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.CreateMany),
    this.ops.createMany()
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Update),
    this.ops.update()
  );

  @Effect()
  updateMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.UpdateMany),
    this.ops.updateMany()
  );

  @Effect()
  replace$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Replace),
    this.ops.replace()
  );

  @Effect()
  replaceMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.ReplaceMany),
    this.ops.replaceMany()
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Delete),
    this.ops.delete()
  );

  @Effect()
  deleteMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteMany),
    this.ops.deleteMany()
  );

  @Effect()
  deleteByKey$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteByKey),
    this.ops.deleteByKey()
  );

  @Effect()
  deleteManyByKeys$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteManyByKeys),
    this.ops.deleteManyByKey()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}

@Injectable()
export class ExtraEffects {
  @Effect()
  select = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Select),
    this.ops.select()
  );

  @Effect()
  selectByKey = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectByKey),
    this.ops.selectByKey()
  );

  @Effect()
  selectMany = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectMany),
    this.ops.selectMany()
  );

  @Effect()
  selectMore = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectMore),
    this.ops.selectMore()
  );

  @Effect()
  selectManyByKeys = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectManyByKeys),
    this.ops.selectManyByKeys()
  );

  @Effect()
  selectMoreByKeys = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.SelectMoreByKeys),
    this.ops.selectMoreByKeys()
  );

  @Effect()
  deselect = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Deselect),
    this.ops.deselect()
  );

  @Effect()
  deselectMany = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeselectMany),
    this.ops.deselectMany()
  );

  @Effect()
  deselectManyByKeys = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeselectManyByKeys),
    this.ops.deselectManyByKeys()
  );

  @Effect()
  deselectAll = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeselectAll),
    this.ops.deselectAll()
  );

  @Effect()
  edit = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Edit),
    this.ops.edit()
  );

  @Effect()
  change = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Change),
    this.ops.change()
  );

  @Effect()
  endEdit = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.EndEdit),
    this.ops.endEdit()
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
export class LoadManyEffect {
  @Effect()
  loadMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadMany),
    this.ops.loadMany()
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
  loadMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadMany),
    this.ops.loadMany()
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

@Injectable()
export class CUDEffects {
  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Create),
    this.ops.create()
  );

  @Effect()
  createMany$: Observable<Action> = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.CreateMany),
    this.ops.createMany()
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Update),
    this.ops.update()
  );

  @Effect()
  updateMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.UpdateMany),
    this.ops.updateMany()
  );

  @Effect()
  replace$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Replace),
    this.ops.replace()
  );

  @Effect()
  replaceMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.ReplaceMany),
    this.ops.replaceMany()
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.Delete),
    this.ops.delete()
  );

  @Effect()
  deleteMany$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteMany),
    this.ops.deleteMany()
  );

  @Effect()
  deleteByKey$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteByKey),
    this.ops.deleteByKey()
  );

  @Effect()
  deleteManyByKeys$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.DeleteManyByKeys),
    this.ops.deleteManyByKey()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
