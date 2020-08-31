import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityIfNecessaryOperators } from './if-necessary-operators';

@Injectable()
export class LoadIfNecessaryEffects {
  @Effect()
  loadIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadIfNecessary),
    this.ifnOps.loadIfNecessary()
  );

  @Effect()
  loadAllIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadAllIfNecessary),
    this.ifnOps.loadAllIfNecessary()
  );

  @Effect()
  loadManyIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadManyIfNecessary),
    this.ifnOps.loadManyIfNecessary()
  );

  @Effect()
  loadPageIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadPageIfNecessary),
    this.ifnOps.loadPageIfNecessary()
  );

  @Effect()
  loadRangeIfNecessary$ = this.actions$.pipe(
    ofEntityAction(EntityActionTypes.LoadRangeIfNecessary),
    this.ifnOps.loadRangeIfNecessary()
  );

  constructor(private actions$: Actions, private ifnOps: EntityIfNecessaryOperators) {}
}
