import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EntityOperators, Load, LoadMany } from 'ngrx-auto-entity';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Customer } from 'models/customer.model';

@Injectable()
export class CustomerEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<Load<Customer>>('[Customer] Generic Load'),
    this.ops.load()
  );

  @Effect()
  loadMany$ = this.actions$.pipe(
    ofType<LoadMany<Customer>>('[Customer] Generic Load Many'),
    this.ops.loadMany()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
