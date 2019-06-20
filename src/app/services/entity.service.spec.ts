import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { IEntityInfo, NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { Customer } from 'models/customer.model';
import { environment } from '../../environments/environment';
import { EntityService } from './entity.service';

xdescribe('EntityService', () => {
  let injector: TestBed;
  let service: EntityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgrxAutoEntityModule],
      providers: [EntityService]
    });
    injector = getTestBed();
    service = injector.get(EntityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const entityInfo: IEntityInfo = {
    modelName: 'Customer',
    modelType: Customer
  };
  const dummyCustomers: Customer[] = [
    {
      id: 1,
      name: 'Peter Parker',
      catchPhrase: `Hey, I'm swingin' here!`,
      isActive: true
    }
  ];

  describe('#load', () => {
    test('should return an Observable<Customer>', () => {
      service.load(entityInfo, dummyCustomers[0].id).subscribe(customer => {
        expect(customer).toEqual(dummyCustomers[0]);
      });

      const req = httpMock.expectOne(`${environment.API_BASE_URL}/customer/${dummyCustomers[0].id}`);
      expect(req.request.url).toBe(`${environment.API_BASE_URL}/customer/${dummyCustomers[0].id}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyCustomers);
    });
  });

  describe('#loadAll', () => {
    test('should return an Observable<Customer[]>', () => {
      service.loadAll(entityInfo).subscribe(customers => {
        expect(customers.length).toBe(1);
        expect(customers).toEqual(dummyCustomers);
      });

      const req = httpMock.expectOne(`${environment.API_BASE_URL}/customer`);
      expect(req.request.url).toBe(`${environment.API_BASE_URL}/customer`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyCustomers);
    });
  });

  describe('#create', () => {
    test('should return an Observable<Customer>', () => {
      const newCustomer = {
        id: 2,
        name: 'Hulk',
        catchPhrase: 'Hulk Smash!'
      };

      service.create(entityInfo, newCustomer).subscribe(customer => {
        expect(customer).toEqual(newCustomer);
      });

      const req = httpMock.expectOne(`${environment.API_BASE_URL}/customer`);
      expect(req.request.url).toBe(`${environment.API_BASE_URL}/customer`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyCustomers);
    });
  });

  describe('#update', () => {
    test('should return an Observable<Customer>', () => {
      const updatedHulk = {
        id: 2,
        name: 'Hulk',
        catchPhrase: 'Hulk, like raging fire'
      };

      service.update(entityInfo, updatedHulk).subscribe(customer => {
        expect(customer).toEqual(updatedHulk);
      });

      const req = httpMock.expectOne(`${environment.API_BASE_URL}/customer/${updatedHulk.id}`);
      expect(req.request.url).toBe(`${environment.API_BASE_URL}/customer/${updatedHulk.id}`);
      expect(req.request.method).toBe('PATCH');
      req.flush(dummyCustomers);
    });
  });

  describe('#replace', () => {
    test('should return an Observable<Customer>', () => {
      const replacedHulk = {
        id: 2,
        name: 'Bruce Banner',
        catchPhrase: `You wouldn't like me when I'm angry`
      };

      service.replace(entityInfo, replacedHulk).subscribe(customer => {
        expect(customer).toEqual(replacedHulk);
      });

      const req = httpMock.expectOne(`${environment.API_BASE_URL}/customer`);
      expect(req.request.url).toBe(`${environment.API_BASE_URL}/customer`);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyCustomers);
    });
  });

  describe('#delete', () => {
    test('should return an Observable<Customer>', () => {
      const hulk = {
        id: 2,
        name: 'Hulk',
        catchPhrase: 'Hulk Smash!'
      };

      service.delete(entityInfo, hulk).subscribe(customer => {
        expect(customer).toEqual(hulk);
      });

      const req = httpMock.expectOne(`${environment.API_BASE_URL}/customer/${hulk.id}`);
      expect(req.request.url).toBe(`${environment.API_BASE_URL}/customer/${hulk.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyCustomers);
    });
  });
});
