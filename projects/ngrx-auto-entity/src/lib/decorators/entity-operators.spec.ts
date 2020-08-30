import { hot } from 'jasmine-marbles';
import { EntityActionTypes } from '../actions/action-types';
import { Clear } from '../actions/actions';
import { matching } from './effect-exclusion-utils';
import { Entity } from './entity-decorator';
import { shouldApplyEffect } from './entity-operators';
import { ENTITY_OPTS_PROP } from './entity-tokens';
import { Key } from './key-decorator';

describe('Operator: shouldApplyEffect', () => {
  test('should not filter out model without @entity decorator', () => {
    class Model {
      @Key id: number;
    }

    const action = new Clear(Model);

    const actions = hot('-a-|', { a: action });
    const expected = hot('-a-|', { a: action });
    const result = actions.pipe(shouldApplyEffect());

    expect(result).toBeObservable(expected);
  });

  test('should not filter out model without exclusion', () => {
    @Entity({ modelName: 'Model' })
    class Model {
      @Key id: number;
    }

    const action = new Clear(Model);

    const actions = hot('-a-|', { a: action });
    const expected = hot('-a-|', { a: action });
    const result = actions.pipe(shouldApplyEffect());

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(result).toBeObservable(expected);
  });

  test('should filter out model with exclusion', () => {
    @Entity({ modelName: 'Model', excludeEffects: matching(EntityActionTypes.Clear) })
    class Model {
      @Key id: number;
    }

    const action = new Clear(Model);

    const actions = hot('-a-|)', { a: action });
    const expected = hot('---|', { a: action });
    const result = actions.pipe(shouldApplyEffect());

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(result).toBeObservable(expected);
  });
});
