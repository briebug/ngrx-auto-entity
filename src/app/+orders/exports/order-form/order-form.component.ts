import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountFacade } from 'facades/account.facade';
import { CustomerFacade } from 'facades/customer.facade';
import { ProductFacade } from 'facades/product.facade';
import { Account } from 'models/account.model';
import { Customer } from 'models/customer.model';
import { OrderItem } from 'models/order-item.model';
import { Order, OrderStatus } from 'models/order.model';
import { Product } from 'models/product.model';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { filter, map, take, takeUntil, withLatestFrom, startWith, tap, shareReplay } from 'rxjs/operators';
import { toCurrencyString } from 'shared/libs/currency.lib';
import { OrderInfo } from 'src/app/+orders/models/order-info.model';
import { FormGroupConfig } from 'src/app/shared/types/forms.type';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  /** Input for initializing or updating the current order */
  @Input() set orderInfo(orderInfo: OrderInfo) {
    if (orderInfo) {
      this.orderFormUpdate$.next({
        ...(this.orderFormUpdate$.getValue() || this.getDefaultFormValue()),
        ...OrderFormComponent.orderInfoToOrderFormValue(orderInfo)
      });
    }
  }
  @Output() orderChange = new EventEmitter<IOrderFormValue>();
  @Output() cancelClick = new EventEmitter<IOrderFormValue>();
  @Output() saveClick = new EventEmitter<IOrderFormValue>();

  accountsByCustomerId$: Observable<Record<number, Account[]>>;
  productsById$: Observable<Record<number, Product>>;
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;

  formGroup: FormGroup;
  currentAccounts$: Observable<Account[]>;
  total$: Observable<number>;

  toCurrencyString = toCurrencyString;
  private orderFormUpdate$: BehaviorSubject<Order> = new BehaviorSubject<Order>(null);
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private customerFacade: CustomerFacade,
    private productFacade: ProductFacade,
    private accountFacade: AccountFacade
  ) {}

  /* Static */
  static orderInfoToOrderFormValue(info: OrderInfo): IOrderFormValue {
    return {
      ...info.order,
      items: info.items.map(
        (item: OrderItem): IOrderFormItem => {
          return { id: item.id, productId: item.productId, quantity: item.quantity, toDelete: false };
        }
      )
    };
  }

  /* Instance */
  ngOnInit() {
    this.initFacadeData();

    this.initForm();
    this.initEmitOrderChangeOnFormGroupValueChange();
    this.initSetFormGroupOnOrderUpdate();
    this.initCurrentAccounts$();
    this.initTotal$();
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
        id: null,
        productId: product.id,
        quantity: 1,
        toDelete: false
      })
    );
    this.itemsFormArray.markAsDirty();
  }

  handleProductQuantityChange(event: { data: string }, index: number) {
    if (event.data === '0') {
      setTimeout(() => {
        const patch: Pick<IOrderFormItem, 'toDelete'> = { toDelete: true };
        const itemFg: FormGroup = this.itemsFormArray.at(index) as FormGroup;
        itemFg.patchValue(patch);
        itemFg.get('quantity').clearValidators();
        itemFg.get('quantity').setErrors(null);
        itemFg.updateValueAndValidity();
        itemFg.markAsDirty();
      }, 250);
    }
  }

  handleCancelClick() {
    this.cancelClick.emit();
  }

  handleSaveClick() {
    this.saveClick.emit(this.formGroup.value);
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
      quantity: [item.quantity || 1, Validators.compose([Validators.required])]
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
    this.accountsByCustomerId$ = this.accountFacade.allByCustomerId$;
    this.productsById$ = this.productFacade.entities$;
    this.customers$ = this.customerFacade.all$.pipe(
      map((products: Customer[]) => {
        return [...products].sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
      }),
      shareReplay(1)
    );
    this.products$ = this.productFacade.all$.pipe(
      map((products: Product[]) => {
        return [...products].sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
      }),
      shareReplay(1)
    );
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

  private initCurrentAccounts$() {
    this.currentAccounts$ = combineLatest([
      this.getControl('customerId').valueChanges.pipe(startWith(this.getControl('customerId').value)),
      this.accountsByCustomerId$
    ]).pipe(
      map(([customerId, accountsByCustomerId]: [number, Record<number, Account[]>]) => {
        return accountsByCustomerId[customerId] || [];
      }),
      shareReplay(1)
    );
  }

  private initTotal$() {
    this.total$ = combineLatest([
      this.itemsFormArray.valueChanges.pipe(startWith(this.itemsFormArray.value)),
      this.productsById$
    ]).pipe(
      map(([items, productsById]: [IOrderFormItem[], Record<number, Product>]) => {
        return items.reduce((total: number, item: IOrderFormItem) => {
          return productsById[item.productId] ? total + +productsById[item.productId].price * item.quantity : total;
        }, 0);
      }),
      shareReplay(1)
    );
  }
}

export interface IOrderFormValue extends Order {
  items: IOrderFormItem[];
}
export type IOrderFormItem = Pick<OrderItem, 'id' | 'productId' | 'quantity'> & { toDelete: boolean };
