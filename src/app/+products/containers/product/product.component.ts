import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';

import { ProductFacade } from '../../../facades';
import { Product } from '../../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Observable<Product>;
  valid = false;

  private updatedProduct: Product;

  constructor(private activatedRoute: ActivatedRoute, private productFacade: ProductFacade) {}

  ngOnInit() {
    this.product = this.activatedRoute.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => +params.get('id')),
      tap(id => {
        this.productFacade.selectByKey(id);
        this.hasProductWithIdInState(id)
          .pipe(first())
          .subscribe(exists => {
            if (!exists) {
              this.productFacade.load(id);
            }
          });
      }),
      switchMap(() => this.productFacade.current$)
    );
  }

  hasProductWithIdInState(id: number): Observable<boolean> {
    return this.productFacade.ids$.pipe(map((ids: number[]) => ids.indexOf(id) > -1));
  }

  onProductChange(payload: { product: Product; valid: boolean }) {
    this.valid = payload.valid;
    if (this.valid) {
      this.updatedProduct = payload.product;
    }
  }

  onSave() {
    if (!this.valid) {
      return;
    }

    if (this.updatedProduct.id == null) {
      this.productFacade.create(this.updatedProduct);
    } else {
      this.productFacade.update(this.updatedProduct);
    }
  }

  private loadProductById(id: number) {
    this.hasProductWithIdInState(id).pipe(first());
  }
}
