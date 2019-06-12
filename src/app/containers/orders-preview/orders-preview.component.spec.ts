import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPreviewComponent } from './orders-preview.component';

describe('OrdersPreviewComponent', () => {
  let component: OrdersPreviewComponent;
  let fixture: ComponentFixture<OrdersPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
