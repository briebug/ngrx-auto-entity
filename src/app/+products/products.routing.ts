import { Routes } from '@angular/router';
import { ProductComponent } from './containers/product/product.component';
import { ProductsComponent } from './containers/products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'add',
    component: ProductComponent
  },
  {
    path: ':id',
    component: ProductComponent
  }
];
