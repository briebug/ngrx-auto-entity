import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBasicTableComponent } from './products-basic-table.component';

describe('ProductsBasicTableComponent', () => {
  let component: ProductsBasicTableComponent;
  let fixture: ComponentFixture<ProductsBasicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsBasicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBasicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
