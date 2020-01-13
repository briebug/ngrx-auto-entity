import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Product } from '../../../models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges, OnDestroy {
  /** The product */
  @Input() product: Product;

  @Output() productChange = new EventEmitter<{ product: Product; valid: boolean }>();
  /** Event emitter for a product change */

  /** The product form */
  formGroup: FormGroup;

  /** Subject to trigger unsubscribe */
  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product && changes.product.currentValue) {
      this.formGroup.patchValue(this.product);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      price: [0, Validators.required],
      dateAdded: [new Date(), Validators.required]
    });

    this.formGroup.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      this.productChange.emit({
        product: {
          ...this.product,
          ...value
        },
        valid: this.formGroup.valid
      });
    });
  }
}
