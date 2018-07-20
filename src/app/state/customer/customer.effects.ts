import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { Delete, EntityActionTypes, EntityOperators, Load, LoadMany, ofEntityType } from 'ngrx-auto-entity';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomerEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofEntityType<Customer, Load<Customer>>(Customer, EntityActionTypes.Load),
    tap(action => {
      console.log(action);
    }),
    this.ops.load()
  );

  @Effect()
  loadMany$ = this.actions$.pipe(
    ofEntityType<Customer, LoadMany<Customer>>(Customer, EntityActionTypes.LoadMany),
    this.ops.loadMany()
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofEntityType<Customer, Delete<Customer>>(Customer, EntityActionTypes.Delete),
    this.ops.delete()
  );

  constructor(private actions$: Actions, private ops: EntityOperators) {}
}
