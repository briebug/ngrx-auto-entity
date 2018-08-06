import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { Page, Range } from './models';
import { IEntityInfo } from './ngrx-auto-entity.actions';
import {
  IAutoEntityService,
  IEntityWithPageInfo,
  IEntityWithRangeInfo,
  NgrxAutoEntityService
} from './ngrx-auto-entity.service';

export class TestModel {
  id: number;
  parentId?: number;
  surrogateKey?: string;
  name: string;
}

@Injectable()
export class TestModelService implements IAutoEntityService<TestModel> {
  load(entityInfo: IEntityInfo, keys: any): Observable<TestModel> {
    if (keys === 1234 || keys.id === 1234 || keys.surrogateKey === 'test_1234') {
      return of({ id: 1234, surrogateKey: 'test_1234', parentId: 1, name: 'Test' });
    }
    return throwError({ message: 'Entity not found' });
  }

  loadAll(entityInfo: IEntityInfo, relationKeys?: any): Observable<TestModel[]> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else {
      return of([{ id: 1234, surrogateKey: 'test_1234', parentId: 1, name: 'Test' }]);
    }
  }

  loadPage(entityInfo: IEntityInfo, page: Page, relationKeys?: any): Observable<IEntityWithPageInfo<TestModel>> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else if (page.page === 1) {
      return of({
        entities: [
          {
            id: 1234,
            surrogateKey: 'test_1234',
            parentId: 1,
            name: 'Test'
          }
        ],
        pageInfo: {
          page: 1,
          totalCount: 1
        }
      });
    } else {
      return of({
        entities: [],
        pageInfo: {
          page: page.page,
          totalCount: 1
        }
      });
    }
  }

  loadRange(entityInfo: IEntityInfo, range: Range, relationKeys?: any): Observable<IEntityWithRangeInfo<TestModel>> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else if ((range.start <= 1234 && range.end >= 1234) || (range.first <= 1234 && range.last >= 1234)) {
      return of({
        entities: [
          {
            id: 1234,
            surrogateKey: 'test_1234',
            parentId: 1,
            name: 'Test'
          }
        ],
        rangeInfo: {
          range,
          totalCount: 1
        }
      });
    } else {
      return of({
        entities: [],
        rangeInfo: {
          range,
          totalCount: 1
        }
      });
    }
  }

  create(entityInfo: IEntityInfo, entity: TestModel, relationKeys?: any): Observable<TestModel> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else {
      return of({ id: entity.id, name: entity.name });
    }
  }

  update(entityInfo: IEntityInfo, entity: TestModel, relationKeys?: any): Observable<TestModel> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else {
      return of({ id: 1234, name: 'Test' });
    }
  }

  replace(entityInfo: IEntityInfo, entity: TestModel, relationKeys?: any): Observable<TestModel> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else {
      return of({ id: 1234, name: 'Test' });
    }
  }

  delete(entityInfo: IEntityInfo, keys: any, relationKeys?: any): Observable<TestModel> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else {
      return of({ id: 1234, name: 'Test' });
    }
  }
}

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
    id: 5678,
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
      entityService.load(entityInfo, 1234).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: 1234, name: 'Test' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      entityService.load(badEntityInfo, 5678).subscribe(
        () => {
          fail('Service should have thrown error');
        },
        error => {
          expect(error).toEqual({ info: entityInfo, err: { message: 'Entity not found' } });
        }
      );
    });
  });

  describe('service load all', () => {
    test('should get a valid entityRef on successful load', () => {
      entityService.loadAll(entityInfo).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: [{ id: 1234, name: 'Test' }] });
      });
    });

    test('should throw an error when the service is not found', () => {
      entityService.loadAll(badEntityInfo).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });

  describe('service create', () => {
    test('should return a valid entityRef on successful create', () => {
      entityService.create(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: 5678, name: 'TestEntity' } });
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
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: 5678, name: 'TestEntity' } });
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
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: 5678, name: 'TestEntity' } });
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
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: 5678, name: 'TestEntity' } });
      });
    });

    test('should throw an error when the service is not found', () => {
      entityService.delete(badEntityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: badEntityInfo, err: entityRef });
      });
    });
  });
});
