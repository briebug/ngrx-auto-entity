import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Customer } from 'models/customer.model';
import { Delete, EntityActionTypes, EntityOperators, Load, LoadMany, ofEntityType, Update } from 'ngrx-auto-entity';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Go } from './../router/router.actions';

@Injectable()
export class CustomerEffects {
  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofEntityType<Customer, Load<Customer>>(Customer, EntityActionTypes.Load),
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

  @Effect({
    dispatch: false
  })
  deleteSuccessSnackBar$ = this.actions$.pipe(
    ofEntityType<Customer, Delete<Customer>>(Customer, EntityActionTypes.DeleteSuccess),
    tap(() => this.matSnackBar.open('Customer Deleted', 'Success', { duration: 2000 }))
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofEntityType<Customer, Update<Customer>>(Customer, EntityActionTypes.Update),
    this.ops.update()
  );

  @Effect()
  updateSuccessSnackBar$ = this.actions$.pipe(
    ofEntityType<Customer, Update<Customer>>(Customer, EntityActionTypes.UpdateSuccess),
    tap(() => this.matSnackBar.open('Customer Updated', 'Success', { duration: 2000 })),
    map(() => new Go({ path: ['customers'] }))
  );

  constructor(private actions$: Actions, private ops: EntityOperators, private matSnackBar: MatSnackBar) {}
}
