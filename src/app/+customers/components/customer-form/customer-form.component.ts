import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnChanges, OnDestroy {
  /** The customer */
  @Input() customer: Customer;

  /** Event emitter for a customer change */
  @Output() customerChange = new EventEmitter<{ customer: Customer; valid: boolean }>();

  /** The customer form */
  formGroup: FormGroup;

  /** Subject to trigger unsubscribe */
  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.customer && changes.customer.currentValue) {
      this.formGroup.patchValue(this.customer);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      catchPhrase: [null, Validators.required],
      isActive: [true]
    });

    this.formGroup.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      this.customerChange.emit({
        customer: {
          ...this.customer,
          ...value
        },
        valid: this.formGroup.valid
      });
    });
  }
}
