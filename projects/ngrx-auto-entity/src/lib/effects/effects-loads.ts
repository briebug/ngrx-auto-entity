import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

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
