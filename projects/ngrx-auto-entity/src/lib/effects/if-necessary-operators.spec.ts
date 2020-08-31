import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { LoadIfNecessary } from '../actions/load-actions';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { EntityIfNecessaryOperators, NGRX_AUTO_ENTITY_APP_STORE } from './if-necessary-operators';

@Entity('Test')
class Test {
  @Key id: number;
}

@Entity('TestMaxAge', {
  defaultMaxAge: 300
})
class TestMaxAge {
  @Key id: number;
}

export function testStoreFactory(store: Store<any>) {
  return store;
}

describe('EntityIfNecessaryOperators', () => {
  let actions$: Observable<any>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        EntityIfNecessaryOperators,
        { provide: NGRX_AUTO_ENTITY_APP_STORE, useFactory: testStoreFactory, deps: [Store] },
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            test: {
              entities: {},
              ids: []
            },
            testMaxAge: {
              entities: { 1: {}, 2: {} },
              ids: [1, 2],
              loadedAt: new Date().setMinutes(new Date().getMinutes() - 6)
            }
          }
        })
      ]
    })
  );

  describe('loadIfNecessary()', () => {
    test('should filter out action if no loadedAt or entities in state', () => {
      const operators: EntityIfNecessaryOperators = TestBed.get(EntityIfNecessaryOperators);
      const action = new LoadIfNecessary(Test, 123);
      actions$ = hot('-a', { a: action });

      const operated = actions$.pipe(operators.loadIfNecessary());

      const expected = hot('--');
      expect(operated).toBeObservable(expected);
    });

    test('should filter out action if loadedAt set but no entities in state', () => {
      const operators: EntityIfNecessaryOperators = TestBed.get(EntityIfNecessaryOperators);
      const store: MockStore<any> = TestBed.get(Store);
      const action = new LoadIfNecessary(Test, 123);
      actions$ = hot('-a', { a: action });

      store.setState({
        test: {
          entities: {},
          ids: [],
          loadedAt: Date.now()
        }
      });

      const operated = actions$.pipe(operators.loadIfNecessary());

      const expected = hot('--');
      expect(operated).toBeObservable(expected);
    });

    test('should filter out action if loadedAt and entities in state but expired by maxAge', () => {
      const operators: EntityIfNecessaryOperators = TestBed.get(EntityIfNecessaryOperators);
      const store: MockStore<any> = TestBed.get(Store);
      const action = new LoadIfNecessary(Test, 123, 600);
      actions$ = hot('-a', { a: action });

      store.setState({
        test: {
          entities: { 1: {}, 2: {} },
          ids: [1, 2],
          loadedAt: new Date().setMinutes(new Date().getMinutes() - 11)
        }
      });

      const operated = actions$.pipe(operators.loadIfNecessary());

      const expected = hot('--');
      expect(operated).toBeObservable(expected);
    });

    test('should filter out action if loadedAt and entities in state but expired by defaultMaxAge', () => {
      const operators: EntityIfNecessaryOperators = TestBed.get(EntityIfNecessaryOperators);
      const action = new LoadIfNecessary(TestMaxAge, 123);
      actions$ = hot('-a', { a: action });

      const operated = actions$.pipe(operators.loadIfNecessary());

      const expected = hot('--');
      expect(operated).toBeObservable(expected);
    });

    test('should emit new Load action if all state present and maxAge not met', () => {
      const operators: EntityIfNecessaryOperators = TestBed.get(EntityIfNecessaryOperators);
      const store: MockStore<any> = TestBed.get(Store);
      const action = new LoadIfNecessary(Test, 123, 600);
      actions$ = hot('-a', { a: action });

      store.setState({
        test: {
          entities: { 1: {}, 2: {}, 123: {} },
          ids: [1, 2, 123],
          loadedAt: new Date().setMinutes(new Date().getMinutes() - 8)
        }
      });

      const operated = actions$.pipe(operators.loadIfNecessary());

      const expected = hot('-b', {
        b: expect.objectContaining({
          actionType: '[Entity] (Generic) Load',
          keys: 123,
          type: '[Test] (Generic) Load'
        })
      });
      expect(operated).toBeObservable(expected);
    });
  });
});
