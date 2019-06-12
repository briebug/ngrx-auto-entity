import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { EntityActionTypes, EntityOperators, ofEntityType } from '@briebug/ngrx-auto-entity';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Product } from 'models/product.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Go } from './router/router.actions';

@Injectable()
export class ProductEffects {
  @Effect()
  createSuccess$: Observable<Action> = this.actions$.pipe(
    ofEntityType(Product, EntityActionTypes.CreateSuccess),
    tap(() => this.matSnackBar.open('Product Created', 'Success', { duration: 2000 })),
    map(() => new Go({ path: ['products'] }))
  );

  @Effect({ dispatch: false })
  deleteSuccessSnackBar$ = this.actions$.pipe(
    ofEntityType(Product, EntityActionTypes.DeleteSuccess),
    tap(() => this.matSnackBar.open('Product Deleted', 'Success', { duration: 2000 }))
  );

  @Effect()
  updateSuccessSnackBar$ = this.actions$.pipe(
    ofEntityType(Product, EntityActionTypes.UpdateSuccess),
    tap(() => this.matSnackBar.open('Product Updated', 'Success', { duration: 2000 })),
    map(() => new Go({ path: ['products'] }))
  );

  constructor(private actions$: Actions, private ops: EntityOperators, private matSnackBar: MatSnackBar) {}
}
