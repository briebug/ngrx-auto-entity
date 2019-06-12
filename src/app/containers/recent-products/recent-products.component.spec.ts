import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentProductsComponent } from './recent-products.component';

describe('RecentProductsComponent', () => {
  let component: RecentProductsComponent;
  let fixture: ComponentFixture<RecentProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
