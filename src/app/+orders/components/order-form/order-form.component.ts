import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'models/order.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnChanges, OnDestroy {
  /** The order */
  @Input() order: Order;

  @Output() orderChange = new EventEmitter<{ order: Order; valid: boolean }>();
  /** Event emitter for a order change */

  /** The order form */
  formGroup: FormGroup;

  /** Subject to trigger unsubscribe */
  private unsubscribe = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.order && changes.order.currentValue) {
      this.formGroup.patchValue(this.order);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}
