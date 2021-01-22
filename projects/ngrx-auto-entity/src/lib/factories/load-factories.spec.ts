import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { map } from 'rxjs/operators';
import { Entity, Key } from '../..';
import { createLoadAction } from './load-factories';

@Entity('Test')
class Test {
  @Key id: number;
}

describe('createLoadAction()', () => {
  it('should create a Load entity action factory that creates a load action', () => {
    const factory = createLoadAction(Test);

    expect(factory).toBeFunction();
    expect(factory.type).toBe('[Test] (Generic) Load');

    const action = factory({ keys: 101 });

    expect(action).not.toBeFunction();
    expect(action.type).toBe('[Test] (Generic) Load');
    expect(action.keys).toBe(101);
  });

  it('should create a Load entity action compatible with an NgRx 8+ reducer function', () => {
    const loadTest = createLoadAction(Test);

    const reduce = createReducer(
      {},
      on(loadTest, (state, { keys }) => ({
        keys
      }))
    );

    const initialState = {};

    const state1 = reduce(initialState, { type: 'Nothing' });

    expect(state1).toEqual(initialState);

    const action = loadTest({ keys: 101 });
    const state2 = reduce(initialState, action);

    expect(state2).toEqual({ keys: 101 });
  });

  it('should create a Load entity action compatible with NgRx ofType operator', () => {
    const loadTest = createLoadAction(Test);
    const action = loadTest({ keys: 101 });

    class Effects {
      constructor(private actions$: Actions) {}

      test$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(loadTest),
            map(({ keys }) => keys)
          ),
        { dispatch: false }
      );
    }

    const actions$$ = hot('-n-a-', { n: { type: 'Nothing' }, a: action });

    const effects = new Effects(actions$$);

    expect(effects.test$).toBeObservable(hot('---k-', { k: 101 }));
  });
});
