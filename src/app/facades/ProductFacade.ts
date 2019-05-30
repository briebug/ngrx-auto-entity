import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'models/product.model';
import { AppState } from 'state/app.interfaces';
import { ProductFacadeBase } from 'state/product.state';

@Injectable({
  providedIn: 'root'
})
export class ProductFacade extends ProductFacadeBase {
  constructor(store: Store<AppState>) {
    super(Product, store);
  }
}
