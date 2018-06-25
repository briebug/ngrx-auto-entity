import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
    if (keys !== '1234') {
      return throwError({ message: 'Entity not found' });
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

// export class TestableAutoEntityService extends NgrxAutoEntityService {
//   constructor(injector: Injector) {
//     super(injector);
//   }
//   testableGetService(entityInfo: IEntityInfo): IAutoEntityService {
//     return super.getService(entityInfo);
//   }
// }

describe('NgrxAutoEntityService', () => {
  let entityService: NgrxAutoEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, CommonModule],
      providers: [{ provide: TestModel, useClass: TestModelService }, NgrxAutoEntityService]
    });
    entityService = TestBed.get(NgrxAutoEntityService);
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
    // test('should be truthy', () => {
    // expect(entityService.getServiceByName(entityInfo)).toBeTruthy();
    // });
  });

  describe('getServiceByToken', () => {
    // test('should be truthy', () => {
    // expect(service.getServiceByToken(entityInfo)).toBeTruthy();
    // });
  });

  describe('service load', () => {
    test('should get a valid entityRef on successful load', () => {
      entityService.load(entityInfo, '1234').subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '1234', name: 'Test' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      entityService.load(badEntityInfo, '5678').subscribe(
        () => {
          fail('Service should have thrown error');
        },
        error => {
          expect(error).toEqual({ info: entityInfo, err: { message: 'Entity not found' } });
        }
      );
    });
  });

  describe('service load many', () => {
    test('should get a valid entityRef on successful load', () => {
      entityService.loadMany(entityInfo).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '1234', name: 'Test' } });
      });
    });
    test('should get a valid entityRef on successful load with page and size inputs', () => {
      entityService.loadMany(entityInfo, 1, 10).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '1234', name: 'Test' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      entityService.loadMany(badEntityInfo).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service create', () => {
    test('should return a valid entityRef on successful create', () => {
      entityService.create(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '5678', name: 'TestEntity' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      entityService.create(badEntityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service update', () => {
    test('should return a valid entityRef on successful update', () => {
      entityService.update(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '5678', name: 'TestEntity' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      entityService.update(badEntityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service replace', () => {
    test('should return a valid entityRef on successful replace', () => {
      entityService.replace(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '5678', name: 'TestEntity' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      entityService.replace(badEntityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service delete', () => {
    test('should return a valid entityRef on successful delete', () => {
      entityService.delete(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: '5678', name: 'TestEntity' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      entityService.delete(badEntityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });
});
