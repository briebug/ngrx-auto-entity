import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerFacade } from 'facades/customer.facade';
import { ProductFacade } from 'facades/product.facade';
import { Customer } from 'models/customer.model';
import { Order, OrderStatus } from 'models/order.model';
import { Product } from 'models/product.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { OrderItem } from 'models/orderItem.model';
import { FormGroupConfig } from 'src/app/shared/types/forms.type';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  /** Input for initializing or updating the current order */
  @Input() set order(formValue: Partial<IOrderFormValue>) {
    this.orderFormUpdate$.next({
      ...(this.orderFormUpdate$.getValue() || this.getDefaultFormValue()),
      ...formValue
    });
  }
  /** Event emitter for an order change */
  @Output() orderChange: EventEmitter<IOrderFormValue> = new EventEmitter<IOrderFormValue>();

  /** Records of products by id */
  productsById$: Observable<Record<number, Product>>;
  /** List of customers the user will be able to pick from */
  customers$: Observable<Customer[]>;
  /** List of products the user will be able to pick from */
  products$: Observable<Product[]>;

  /** The order form */
  formGroup: FormGroup;

  /** BehaviorSubject that passes on external updates (usually from the parent) to the order form */
  private orderFormUpdate$: BehaviorSubject<Order> = new BehaviorSubject<Order>(null);
  /** Subject to trigger unsubscribe */
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private customerFacade: CustomerFacade,
    private productFacade: ProductFacade
  ) {}

  ngOnInit() {
    this.initFacadeData();

    this.initForm();
    this.initEmitOrderChangeOnFormGroupValueChange();
    this.initSetFormGroupOnOrderUpdate();
  }

  ngOnDestroy() {
    this.orderFormUpdate$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /* Handlers */
  handleAddProductClick(product: Product) {
    this.itemsFormArray.push(
      this.getFormGroupForItem({
        productId: product.id,
        quantity: 1
      })
    );
  }

  /* Public */
  getDefaultFormValue(): IOrderFormValue {
    return {
      id: null,
      accountId: null,
      customerId: null,
      dateOfOrder: null,
      status: OrderStatus.open,
      items: []
    };
  }

  getControl(key: keyof IOrderFormValue): AbstractControl | null {
    if (this.formGroup) {
      return this.formGroup.get(key);
    } else {
      return null;
    }
  }

  get itemsFormArray(): FormArray {
    return this.getControl('items') as FormArray;
  }

  /* Private */
  private getFormGroupForItem(item: IOrderFormItem): FormGroup {
    const config: FormGroupConfig<IOrderFormItem> = {
      ...item,
      quantity: [item.quantity || 1, Validators.compose([Validators.required, Validators.min(1)])]
    };

    return this.formBuilder.group(config);
  }

  private getFormArrayForItems(items: IOrderFormItem[]): FormArray {
    const formGroups: FormGroup[] = items.map((item: IOrderFormItem): FormGroup => this.getFormGroupForItem(item));

    return this.formBuilder.array(formGroups);
  }

  /* Init */
  private initForm() {
    this.orderFormUpdate$.pipe(take(1)).subscribe((initialFormValue: IOrderFormValue | null) => {
      const _initialFormValue: IOrderFormValue = initialFormValue || this.getDefaultFormValue();
      const config: FormGroupConfig<IOrderFormValue> = {
        ..._initialFormValue,
        customerId: [_initialFormValue.customerId, Validators.required],
        items: this.getFormArrayForItems(_initialFormValue.items)
      };

      this.formGroup = this.formBuilder.group(config);
    });
  }

  private initFacadeData() {
    this.productsById$ = this.productFacade.entities$;
    this.customers$ = this.customerFacade.all$;
    this.products$ = this.productFacade.all$;
  }

  private initEmitOrderChangeOnFormGroupValueChange() {
    this.formGroup.valueChanges
      .pipe(
        withLatestFrom(this.orderFormUpdate$),
        map(
          ([currentFormValue, externalFormValue]: [IOrderFormValue, Order]): IOrderFormValue => {
            return {
              ...externalFormValue,
              ...currentFormValue
            };
          }
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((formValue: IOrderFormValue) => {
        this.orderChange.emit(formValue);
      });
  }

  private initSetFormGroupOnOrderUpdate() {
    this.orderFormUpdate$
      .pipe(
        filter(v => !!v),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((formValue: IOrderFormValue) => {
        this.formGroup.patchValue(formValue);
      });
  }
}

export interface IOrderFormValue extends Order {
  items: IOrderFormItem[];
}
export type IOrderFormItem = Pick<OrderItem, 'productId' | 'quantity'>;
