import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEntityInfo } from './actions';
import { Page, Range } from './models';
import { IAutoEntityService, IEntityWithPageInfo, IEntityWithRangeInfo, NgrxAutoEntityService } from './service';

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
    }

    if ((range.start <= 1234 && range.end >= 1234) || (range.first <= 1234 && range.last >= 1234)) {
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
    }

    return of({
      entities: [],
      rangeInfo: {
        range,
        totalCount: 1
      }
    });
  }

  create(entityInfo: IEntityInfo, entity: TestModel, relationKeys?: any): Observable<TestModel> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else {
      return of(entity);
    }
  }

  update(entityInfo: IEntityInfo, entity: TestModel, relationKeys?: any): Observable<TestModel> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else {
      return of(entity);
    }
  }

  replace(entityInfo: IEntityInfo, entity: TestModel, relationKeys?: any): Observable<TestModel> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else {
      return of(entity);
    }
  }

  delete(entityInfo: IEntityInfo, entity: TestModel, relationKeys?: any): Observable<TestModel> {
    if (entityInfo.modelName !== 'TestModel') {
      return throwError({ message: 'Service not found' });
    } else {
      return of(entity);
    }
  }
}

describe('NgRX Auto-Entity: Service', () => {
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

  describe('load', () => {
    test('should get a valid entityRef on successful load', done => {
      entityService.load(entityInfo, 1234).subscribe(entityRef => {
        expect(entityRef).toEqual({
          info: entityInfo,
          entity: { id: 1234, name: 'Test', parentId: 1, surrogateKey: 'test_1234' }
        });
        done();
      });
    });

    test('should throw an error when the service is not found', done => {
      entityService
        .load(badEntityInfo, 1234)
        .pipe(
          catchError(err => {
            expect(err).toEqual({ info: badEntityInfo, err: { message: 'Service not found' } });
            return of(err);
          })
        )
        .subscribe(() => {
          done();
        });
    });
  });

  describe('loadAll', () => {
    test('should get a valid entityRef on successful load', done => {
      entityService.loadAll(entityInfo).subscribe(entityRef => {
        expect(entityRef).toEqual({
          info: entityInfo,
          entity: [{ id: 1234, name: 'Test', parentId: 1, surrogateKey: 'test_1234' }]
        });
        done();
      });
    });

    test('should throw an error when the service is not found', done => {
      entityService
        .loadAll(badEntityInfo)
        .pipe(
          catchError(err => {
            expect(err).toEqual({ info: badEntityInfo, err: { message: 'Service not found' } });
            return of(err);
          })
        )
        .subscribe(() => {
          done();
        });
    });
  });

  describe('loadPage', () => {
    test('should get a valid entityRef on successful load of filled page', done => {
      entityService.loadPage(entityInfo, { page: 1, size: 1 }).subscribe(entityRef => {
        expect(entityRef).toEqual({
          info: entityInfo,
          pageInfo: { page: 1, totalCount: 1 },
          entity: [{ id: 1234, name: 'Test', parentId: 1, surrogateKey: 'test_1234' }]
        });
        done();
      });
    });

    test('should get a valid entityRef on successful load of empty page', done => {
      entityService.loadPage(entityInfo, { page: 2, size: 1 }).subscribe(entityRef => {
        expect(entityRef).toEqual({
          info: entityInfo,
          pageInfo: { page: 2, totalCount: 1 },
          entity: []
        });
        done();
      });
    });

    test('should throw an error when the service is not found', done => {
      entityService
        .loadPage(badEntityInfo, { page: 2, size: 1 })
        .pipe(
          catchError(err => {
            expect(err).toEqual({ info: badEntityInfo, err: { message: 'Service not found' } });
            return of(err);
          })
        )
        .subscribe(() => {
          done();
        });
    });
  });

  describe('loadRange', () => {
    test('should get a valid entityRef on successful load of filled first/last range', done => {
      entityService.loadRange(entityInfo, { first: 1000, last: 2000 }).subscribe(entityRef => {
        expect(entityRef).toEqual({
          info: entityInfo,
          rangeInfo: { range: { first: 1000, last: 2000 }, totalCount: 1 },
          entity: [{ id: 1234, name: 'Test', parentId: 1, surrogateKey: 'test_1234' }]
        });
        done();
      });
    });

    test('should get a valid entityRef on successful load of empty first/last range', done => {
      entityService.loadRange(entityInfo, { start: 0, end: 1000 }).subscribe(entityRef => {
        expect(entityRef).toEqual({
          info: entityInfo,
          rangeInfo: { range: { start: 0, end: 1000 }, totalCount: 1 },
          entity: []
        });
        done();
      });
    });

    test('should get a valid entityRef on successful load of filled start/end range', done => {
      entityService.loadRange(entityInfo, { start: 1000, end: 2000 }).subscribe(entityRef => {
        expect(entityRef).toEqual({
          info: entityInfo,
          rangeInfo: { range: { start: 1000, end: 2000 }, totalCount: 1 },
          entity: [{ id: 1234, name: 'Test', parentId: 1, surrogateKey: 'test_1234' }]
        });
        done();
      });
    });

    test('should get a valid entityRef on successful load of empty start/end range', done => {
      entityService.loadRange(entityInfo, { start: 0, end: 1000 }).subscribe(entityRef => {
        expect(entityRef).toEqual({
          info: entityInfo,
          rangeInfo: { range: { start: 0, end: 1000 }, totalCount: 1 },
          entity: []
        });
        done();
      });
    });

    test('should throw an error when the service is not found', done => {
      entityService
        .loadRange(badEntityInfo, { start: 0, end: 1 })
        .pipe(
          catchError(err => {
            expect(err).toEqual({ info: badEntityInfo, err: { message: 'Service not found' } });
            return of(err);
          })
        )
        .subscribe(() => {
          done();
        });
    });
  });

  describe('create', () => {
    test('should return a valid entityRef on successful create', done => {
      entityService.create(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: 5678, name: 'TestEntity' } });
        done();
      });
    });

    test('should throw an error when the service is not found', done => {
      entityService
        .create(badEntityInfo, entity)
        .pipe(
          catchError(err => {
            expect(err).toEqual({ info: badEntityInfo, err: { message: 'Service not found' } });
            return of(err);
          })
        )
        .subscribe(() => {
          done();
        });
    });
  });

  describe('update', () => {
    test('should return a valid entityRef on successful update', done => {
      entityService.update(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: 5678, name: 'TestEntity' } });
        done();
      });
    });

    test('should throw an error when the service is not found', done => {
      entityService
        .update(badEntityInfo, entity)
        .pipe(
          catchError(err => {
            expect(err).toEqual({ info: badEntityInfo, err: { message: 'Service not found' } });
            return of(err);
          })
        )
        .subscribe(() => {
          done();
        });
    });
  });

  describe('replace', () => {
    test('should return a valid entityRef on successful replace', done => {
      entityService.replace(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: 5678, name: 'TestEntity' } });
        done();
      });
    });

    test('should throw an error when the service is not found', done => {
      entityService
        .replace(badEntityInfo, entity)
        .pipe(
          catchError(err => {
            expect(err).toEqual({ info: badEntityInfo, err: { message: 'Service not found' } });
            return of(err);
          })
        )
        .subscribe(() => {
          done();
        });
    });
  });

  describe('delete', () => {
    test('should return a valid entityRef on successful delete', done => {
      entityService.delete(entityInfo, entity).subscribe(entityRef => {
        expect(entityRef).toEqual({ info: entityInfo, entity: { id: 5678, name: 'TestEntity' } });
        done();
      });
    });

    test('should throw an error when the service is not found', done => {
      entityService
        .delete(badEntityInfo, entity)
        .pipe(
          catchError(err => {
            expect(err).toEqual({ info: badEntityInfo, err: { message: 'Service not found' } });
            return of(err);
          })
        )
        .subscribe(() => {
          done();
        });
    });
  });
});
