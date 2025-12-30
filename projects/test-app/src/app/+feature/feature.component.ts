import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { allProducts, manyProductsLoadingIfNecessary, productEditedById, productEditEnded } from './state/product/product.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <h1>Products</h1>

    <button (click)="editByKey(1)">Edit</button>
    <button (click)="endEdit()">End Edit</button>

    <ul>
      @for (product of allProducts(); track product.id) {
      <li>{{ product.name }}</li>
      }
    </ul>
  `
})
export class FeatureComponent {
  protected readonly store = inject(Store);

  protected readonly allProducts = this.store.selectSignal(allProducts);

  constructor() {
    this.store.dispatch(manyProductsLoadingIfNecessary());
    setTimeout(() => this.store.dispatch(manyProductsLoadingIfNecessary()), 2000);
  }

  editByKey(id: number) {
    this.store.dispatch(productEditedById({ key: id }));
  }

  endEdit() {
    this.store.dispatch(productEditEnded());
  }
}
