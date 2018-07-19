import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { CustomersTableComponent } from './customers-table.component';

describe('CustomersTableComponent', () => {
  let component: CustomersTableComponent;
  let fixture: ComponentFixture<CustomersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersTableComponent],
      imports: [MaterialModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
