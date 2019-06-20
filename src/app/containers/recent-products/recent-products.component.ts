import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductFacade } from 'facades/product.facade';
import { Product } from 'models/product.model';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productFacade: ProductFacade) {}

  ngOnInit() {
    this.productFacade.loadAll();
    this.products$ = this.productFacade.mostRecent(3);
  }
}
