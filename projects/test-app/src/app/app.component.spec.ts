import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CustomerFacade } from './state/customer.facade';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: CustomerFacade,
          useValue: {
            loadAll: jest.fn()
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
