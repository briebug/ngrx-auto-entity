import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { hot } from 'jasmine-marbles';
import { Load, LoadFailure, LoadSuccess } from '../actions/load-actions';
import { LoadAll, LoadAllFailure, LoadAllSuccess } from '../actions/load-all-actions';
import { LoadMany, LoadManyFailure, LoadManySuccess } from '../actions/load-many-actions';
import { LoadPage, LoadPageFailure, LoadPageSuccess } from '../actions/load-page-actions';
import { LoadRange, LoadRangeFailure, LoadRangeSuccess } from '../actions/load-range-actions';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { NgrxAutoEntityService } from '../service/service';
import { makeEntity } from '../util/make-entity';
import { EntityOperators } from './operators';

@Entity('TestEntity')
class TestEntity {
  @Key id: number;
}

describe('EntityOperators', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
      teardown: { destroyAfterEach: false }
    });
    TestBed.configureTestingModule({
      providers: [
        EntityOperators,
        {
          provide: NgrxAutoEntityService,
          useValue: {
            load: jest.fn(),
            loadMany: jest.fn(),
            loadAll: jest.fn(),
            loadPage: jest.fn(),
            loadRange: jest.fn(),
            create: jest.fn(),
            createMany: jest.fn(),
            update: jest.fn(),
            updateMany: jest.fn(),
            upsert: jest.fn(),
            upsertMany: jest.fn(),
            replace: jest.fn(),
            replaceMany: jest.fn(),
            delete: jest.fn(),
            deleteMany: jest.fn(),
            deleteByKey: jest.fn(),
            deleteManyByKey: jest.fn()
          }
        }
      ]
    });
  });

  describe('load()', () => {
    it('should return LoadSuccess with a matching correlationId on success', () => {
      const entity = makeEntity(TestEntity)({
        id: 1
      });
      const action = new Load(TestEntity, 1);
      const actions$ = hot('-a-', { a: action });
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'load').mockReturnValue(
        hot('-e-', {
          e: {
            info: action.info,
            entity
          }
        })
      );

      const effect = actions$.pipe(ops.load());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadSuccess(TestEntity, entity, 1, undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
    });

    it('should return LoadFailure with a matching correlationId on error', () => {
      const action = new Load(TestEntity, 1);
      const actions$ = hot('-a-', { a: action });
      const err = new Error('Error occurred');
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'load').mockReturnValue(
        hot(
          '-#',
          {},
          {
            info: action.info,
            message: err.message,
            err
          }
        )
      );

      const consoleSpy = jest.spyOn(console, 'error');

      const effect = actions$.pipe(ops.load());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadFailure(TestEntity, err, 1, undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
      expect(consoleSpy).toHaveBeenCalledWith(
        '[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations (load) on the entity service configured for the TestEntity entity.',
        err.message
      );
    });
  });

  describe('loadMany()', () => {
    it('should return LoadManySuccess with a matching correlationId on success', () => {
      const entity = makeEntity(TestEntity)({
        id: 1
      });
      const action = new LoadMany(TestEntity);
      const actions$ = hot('-a-', { a: action });
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'loadMany').mockReturnValue(
        hot('-e-', {
          e: {
            info: action.info,
            entity: [entity]
          }
        })
      );

      const effect = actions$.pipe(ops.loadMany());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadManySuccess(TestEntity, [entity], undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
    });

    it('should return LoadManyFailure with a matching correlationId on error', () => {
      const action = new LoadMany(TestEntity);
      const actions$ = hot('-a-', { a: action });
      const err = new Error('Error occurred');
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'loadMany').mockReturnValue(
        hot(
          '-#',
          {},
          {
            info: action.info,
            message: err.message,
            err
          }
        )
      );

      const consoleSpy = jest.spyOn(console, 'error');
      consoleSpy.mockClear();

      const effect = actions$.pipe(ops.loadMany());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadManyFailure(TestEntity, err, undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
      expect(consoleSpy).toHaveBeenCalledWith(
        '[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations (loadMany) on the entity service configured for the TestEntity entity.',
        err.message
      );
    });
  });

  describe('loadAll()', () => {
    it('should return LoadAllSuccess with a matching correlationId on success', () => {
      const entity = makeEntity(TestEntity)({
        id: 1
      });
      const action = new LoadAll(TestEntity);
      const actions$ = hot('-a-', { a: action });
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'loadAll').mockReturnValue(
        hot('-e-', {
          e: {
            info: action.info,
            entity: [entity]
          }
        })
      );

      const effect = actions$.pipe(ops.loadAll());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadAllSuccess(TestEntity, [entity], undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
    });

    it('should return LoadAllFailure with a matching correlationId on error', () => {
      const action = new LoadAll(TestEntity);
      const actions$ = hot('-a-', { a: action });
      const err = new Error('Error occurred');
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'loadAll').mockReturnValue(
        hot(
          '-#',
          {},
          {
            info: action.info,
            message: err.message,
            err
          }
        )
      );

      const consoleSpy = jest.spyOn(console, 'error');
      consoleSpy.mockClear();

      const effect = actions$.pipe(ops.loadAll());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadAllFailure(TestEntity, err, undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
      expect(consoleSpy).toHaveBeenCalledWith(
        '[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations (loadAll) on the entity service configured for the TestEntity entity.',
        err.message
      );
    });
  });

  describe('loadPage()', () => {
    it('should return LoadPageSuccess with a matching correlationId on success', () => {
      const page = { page: 2, size: 10 };
      const pageInfo = { page, totalCount: 1100 };
      const entity = makeEntity(TestEntity)({
        id: 1
      });
      const action = new LoadPage(TestEntity, page);
      const actions$ = hot('-a-', { a: action });
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'loadPage').mockReturnValue(
        hot('-e-', {
          e: {
            info: action.info,
            pageInfo,
            entity: [entity]
          }
        })
      );

      const effect = actions$.pipe(ops.loadPage());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadPageSuccess(TestEntity, [entity], pageInfo, undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
    });

    it('should return LoadPageFailure with a matching correlationId on error', () => {
      const page = { page: 2, size: 10 };
      const action = new LoadPage(TestEntity, page);
      const actions$ = hot('-a-', { a: action });
      const err = new Error('Error occurred');
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'loadPage').mockReturnValue(
        hot(
          '-#',
          {},
          {
            info: action.info,
            message: err.message,
            err
          }
        )
      );

      const consoleSpy = jest.spyOn(console, 'error');
      consoleSpy.mockClear();

      const effect = actions$.pipe(ops.loadPage());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadPageFailure(TestEntity, err, page, undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
      expect(consoleSpy).toHaveBeenCalledWith(
        '[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations (loadPage) on the entity service configured for the TestEntity entity.',
        err.message
      );
    });
  });

  describe('loadRange()', () => {
    it('should return LoadRangeSuccess with a matching correlationId on success', () => {
      const range = { skip: 20, take: 10 };
      const rangeInfo = { range, totalCount: 1100 };
      const entity = makeEntity(TestEntity)({
        id: 1
      });
      const action = new LoadRange(TestEntity, range);
      const actions$ = hot('-a-', { a: action });
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'loadRange').mockReturnValue(
        hot('-e-', {
          e: {
            info: action.info,
            rangeInfo,
            entity: [entity]
          }
        })
      );

      const effect = actions$.pipe(ops.loadRange());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadRangeSuccess(TestEntity, [entity], rangeInfo, undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
    });

    it('should return LoadRangeFailure with a matching correlationId on error', () => {
      const range = { skip: 20, take: 10 };
      const action = new LoadRange(TestEntity, range);
      const actions$ = hot('-a-', { a: action });
      const err = new Error('Error occurred');
      const ops = TestBed.inject(EntityOperators);
      const service: NgrxAutoEntityService = TestBed.inject(NgrxAutoEntityService);

      jest.spyOn(service, 'loadRange').mockReturnValue(
        hot(
          '-#',
          {},
          {
            info: action.info,
            message: err.message,
            err
          }
        )
      );

      const consoleSpy = jest.spyOn(console, 'error');
      consoleSpy.mockClear();

      const effect = actions$.pipe(ops.loadRange());

      const expected = hot('-s-', {
        s: expect.objectContaining(new LoadRangeFailure(TestEntity, err, range, undefined, action.correlationId))
      });

      expect(effect).toBeObservable(expected);
      expect(consoleSpy).toHaveBeenCalledWith(
        '[NGRX-AE] ! NgRxAutoEntityService Error: Unable to invoke required operations (loadRange) on the entity service configured for the TestEntity entity.',
        err.message
      );
    });
  });
});
