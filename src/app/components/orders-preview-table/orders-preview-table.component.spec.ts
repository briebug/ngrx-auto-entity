import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPreviewTableComponent } from './orders-preview-table.component';

describe('OrdersPreviewTableComponent', () => {
  let component: OrdersPreviewTableComponent;
  let fixture: ComponentFixture<OrdersPreviewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPreviewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPreviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
