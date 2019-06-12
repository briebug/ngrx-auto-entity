import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'models/product.model';
import { AppState } from 'state/app.state';
import { ProductFacadeBase } from 'state/product.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductFacade extends ProductFacadeBase {
  constructor(store: Store<AppState>) {
    super(Product, store);
  }

  mostRecent(count: number): Observable<Product[]> {
    return this.all.pipe(
      map(products => {
        products.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
        return products;
      }),
      map(products => products.slice(0, count))
    );
  }
}
