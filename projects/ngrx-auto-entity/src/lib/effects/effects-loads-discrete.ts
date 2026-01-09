import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ofEntityAction } from '../actions/action-operators';
import { EntityActionTypes } from '../actions/action-types';
import { EntityOperators } from './operators';

@Injectable()
export class LoadEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  load$: Observable<Action> = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.Load), this.ops.load()));
}

@Injectable()
export class LoadAllEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  loadAll$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadAll), this.ops.loadAll()));
}

@Injectable()
export class LoadManyEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  loadMany$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadMany), this.ops.loadMany()));
}

@Injectable()
export class LoadPageEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  loadPage$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadPage), this.ops.loadPage()));
}

@Injectable()
export class LoadRangeEffect {
  private readonly actions$ = inject(Actions);
  private readonly ops = inject(EntityOperators);

  loadRange$ = createEffect(() => this.actions$.pipe(ofEntityAction(EntityActionTypes.LoadRange), this.ops.loadRange()));
}
