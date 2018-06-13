import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { cold, hot, time } from 'jest-marbles';
import { Observable, of, throwError } from 'rxjs';

import { IEntityInfo } from './ngrx-auto-entity.actions';
import { IAutoEntityService, NgrxAutoEntityService } from './ngrx-auto-entity.service';

export class TestModel {
  id: string;
  name: string;
}

@Injectable()
export class TestModelService implements IAutoEntityService {
  constructor(private http: HttpClient) {}
  load(entityInfo: IEntityInfo, keys: any): Observable<any> {
    if (entityInfo.modelName !== 'TestModel') {
      return of({ message: 'Service not found' });
    } else {
      return of({ id: '1234', name: 'Test' });
    }
  }
  loadMany(entityInfo: IEntityInfo, page: number, size: number): Observable<any> {
    if (entityInfo.modelName !== 'TestModel') {
      return of({ message: 'Service not found' });
    } else {
      return of([{ id: '1234', name: 'Test' }]);
    }
  }
  create(entityInfo: IEntityInfo, entity: TestModel): Observable<any> {
    if (entityInfo.modelName !== 'TestModel') {
      return of({ message: 'Service not found' });
    } else {
      return of({ id: entity.id, name: entity.name });
    }
  }
  update(entityInfo: IEntityInfo, entity: TestModel): Observable<any> {
    if (entityInfo.modelName !== 'TestModel') {
      return of({ message: 'Service not found' });
    } else {
      return of({ id: '1234', name: 'Test' });
    }
  }
  replace(entityInfo: IEntityInfo, entity: TestModel): Observable<any> {
    if (entityInfo.modelName !== 'TestModel') {
      return of({ message: 'Service not found' });
    } else {
      return of({ id: '1234', name: 'Test' });
    }
  }
  delete(entityInfo: IEntityInfo, keys: any): Observable<any> {
    if (entityInfo.modelName !== 'TestModel') {
      return of({ message: 'Service not found' });
    } else {
      return of({ id: '1234', name: 'Test' });
    }
  }
}
@Injectable()
export class SomeModelService implements IAutoEntityService {
  constructor(private http: HttpClient) {}
  load(entityInfo: IEntityInfo, keys: any): Observable<any> {
    return of({ id: '1234', name: 'Test' });
  }
  loadMany(entityInfo: IEntityInfo, page: number, size: number): Observable<TestModel[]> {
    return of([{ id: '1234', name: 'Test' }]);
  }
  create(entityInfo: IEntityInfo, entity: TestModel): Observable<TestModel> {
    return of({ id: '1234', name: 'Test' });
  }
  update(entityInfo: IEntityInfo, entity: TestModel): Observable<TestModel> {
    return of({ id: '1234', name: 'Test' });
  }
  replace(entityInfo: IEntityInfo, entity: TestModel): Observable<TestModel> {
    return of({ id: '1234', name: 'Test' });
  }
  delete(entityInfo: IEntityInfo, keys: any): Observable<TestModel> {
    return of({ id: '1234', name: 'Test' });
  }
}

describe('NgrxAutoEntityService', () => {
  let service: NgrxAutoEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        NgrxAutoEntityService,
        TestModelService,
        { provide: 'TestModelService', useClass: TestModelService },
        { provide: 'SomeModelService', useClass: SomeModelService }
      ]
    });
    service = TestBed.get(NgrxAutoEntityService);
  });

  const entityInfo: IEntityInfo = {
    modelName: 'TestModel',
    modelType: TestModel
  };

  const entity: TestModel = {
    id: '5678',
    name: 'TestEntity'
  };

  const badEntityInfo: IEntityInfo = {
    modelName: 'SomeModel',
    modelType: TestModel
  };

  describe('getServiceByName', () => {
    test('should be truthy', () => {
      expect(service.getServiceByName(entityInfo)).toBeTruthy();
    });
  });

  describe('getServiceByToken', () => {
    test('should be truthy', () => {
      // expect(service.getServiceByToken(entityInfo)).toBeTruthy();
    });
  });

  describe('service load', () => {
    test('should get a valid entityRef on successful load', () => {
      service.load(entityInfo, '1234').subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '1234', name: 'Test' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      service.load(badEntityInfo, '1234').subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
        expect(throwError).toHaveBeenCalledWith({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service load many', () => {
    test('should get a valid entityRef on successful load', () => {
      service.loadMany(entityInfo).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '1234', name: 'Test' } });
      });
    });
    test('should get a valid entityRef on successful load with page and size inputs', () => {
      service.loadMany(entityInfo, 1, 10).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '1234', name: 'Test' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      service.loadMany(badEntityInfo).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service create', () => {
    test('should return a valid entityRef on successful create', () => {
      service.create(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '5678', name: 'TestEntity' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      service.create(badEntityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service update', () => {
    test('should return a valid entityRef on successful update', () => {
      service.update(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '5678', name: 'TestEntity' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      service.update(badEntityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service replace', () => {
    test('should return a valid entityRef on successful replace', () => {
      service.replace(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '5678', name: 'TestEntity' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      service.replace(badEntityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service delete', () => {
    test('should return a valid entityRef on successful delete', () => {
      service.delete(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '5678', name: 'TestEntity' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      service.delete(badEntityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });
});
