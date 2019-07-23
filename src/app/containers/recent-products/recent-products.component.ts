import { Component } from '@angular/core';
import { ProductFacade } from 'facades/product.facade';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent {
  constructor(public products: ProductFacade) {
    products.loadAll();
  }
}
