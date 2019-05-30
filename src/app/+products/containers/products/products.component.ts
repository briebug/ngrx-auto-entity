import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ProductFacade } from 'facades/ProductFacade';
import { Product } from 'models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private router: Router, private productFacade: ProductFacade) {}

  ngOnInit() {
    this.productFacade.loadAll();
    this.products$ = this.productFacade.all;
  }

  onDelete(product: Product) {
    this.productFacade.delete(product);
  }

  onEdit(product: Product) {
    this.productFacade.select(product);
    this.router.navigate(['products', product.id]);
  }
}
