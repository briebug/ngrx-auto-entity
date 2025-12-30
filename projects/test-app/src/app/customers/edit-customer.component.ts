import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CustomerFacade } from '../state/customer';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Customer } from '../models/customer.model';
import { Observable, distinctUntilChanged, map, scan, switchMap, shareReplay } from 'rxjs';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="customerForm()" (ngSubmit)="submit()">
      <div class="form-actions">
        @if (customers.edited()) {
        <button type="submit" [disabled]="!customers.isDirty()">Save</button>
        <button type="button" (click)="cancel()">Cancel</button>
        } @else {
        <button type="button" (click)="edit()">Edit</button>
        }
      </div>

      <div class="form-group">
        <label for="isActive">Is Active</label>
        <input type="checkbox" id="isActive" formControlName="isActive" />
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" formControlName="name" />
      </div>
      <div class="form-group">
        <label for="catchPhrase">Catch Phrase</label>
        <input type="text" id="catchPhrase" formControlName="catchPhrase" />
      </div>
      <div style="display: grid; grid: 1fr 1fr / 1fr 1fr 1fr; column-gap: 0.5rem;" formGroupName="address">
        <div class="form-group" style="grid-column: 1 / span 3;">
          <label for="address-street1">Street 1</label>
          <input type="text" id="address-street1" formControlName="street1" />
        </div>
        <div class="form-group">
          <label for="address-city">City</label>
          <input type="text" id="address-city" formControlName="city" />
        </div>
        <div class="form-group">
          <label for="address-state">State</label>
          <input type="text" id="address-state" formControlName="state" />
        </div>
        <div class="form-group">
          <label for="address-zip">Zip</label>
          <input type="text" id="address-zip" formControlName="zip" />
        </div>
      </div>
    </form>
  `,
  styles: ``
})
export class EditCustomerComponent {
  protected readonly customers = inject(CustomerFacade);
  protected readonly fb = inject(NonNullableFormBuilder);

  private customerForm$: Observable<CustomerForm> = this.customers.current$.pipe(
    distinctUntilChanged(),
    scan((form, customer) => {
      if (form != null) {
        form.patchValue(customer);
        return form;
      } else {
        return createCustomerForm(this.fb, customer);
      }
    }, null),
    shareReplay(1)
  );

  protected customerForm = toSignal(this.customerForm$, { requireSync: true });

  constructor() {
    this.customerForm$
      .pipe(
        switchMap(form => form.valueChanges.pipe(map(() => form.getRawValue()))),
        takeUntilDestroyed()
      )
      .subscribe(change => this.customers.change(change));

    this.customerForm().disable({ emitEvent: false });
  }

  protected edit(): void {
    this.customerForm().enable({ emitEvent: false });
    this.customers.edit(this.customers.current());
  }

  protected cancel(): void {
    this.customers.endEdit();
    this.customerForm().reset(this.customers.current(), { emitEvent: false });
    this.customerForm().disable({ emitEvent: false });
    //TODO: reset form
  }

  protected submit(): void {
    this.customers.endEdit();
  }
}

type CustomerForm = ReturnType<typeof createCustomerForm>;

function createCustomerForm(fb: NonNullableFormBuilder, customer: Customer) /* infer */ {
  return fb.group({
    isActive: [customer?.isActive ?? true],
    name: [customer?.name ?? ''],
    catchPhrase: [customer?.catchPhrase ?? ''],
    address: fb.group({
      street1: [customer?.address?.street1 ?? ''],
      city: [customer?.address?.city ?? ''],
      state: [customer?.address?.state ?? ''],
      zip: [customer?.address?.zip ?? '']
    })
  });
}
