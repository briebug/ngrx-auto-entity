import { EntityActionTypes } from '../..';
import { Load } from '../actions/load-actions';
import { setActionType } from '../actions/util';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { LoadProps } from './load-factories';
import { cacheOnType, defineTypedFactoryFunction, NAE_TYPE_ACTION_CACHE } from './util';

@Entity('Test')
class Test {
  @Key id: number;
}

describe('defineTypedFactoryFunction()', () => {
  it('should attach a read-only type property to the specified action Creator', () => {
    const factory = defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Load, Test),
      ({ keys, criteria, correlationId }: LoadProps) => new Load(Test, keys, criteria, correlationId)
    );

    expect(factory).toBeTruthy();
    expect(factory).toBeFunction();
    expect(factory.type).toBe('[Test] (Generic) Load');
  });
});


describe('cacheOnType()', () => {
  it(`should attach ${NAE_TYPE_ACTION_CACHE} property to specified entity model class`, () => {
    const factory = cacheOnType(Test, EntityActionTypes.Load, () => defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Load, Test),
      ({ keys, criteria, correlationId }: LoadProps) => new Load(Test, keys, criteria, correlationId)
    ));

    expect(factory).toBeTruthy();
    expect(factory).toBeFunction();
    expect(factory.type).toBe('[Test] (Generic) Load');
    expect(Test[NAE_TYPE_ACTION_CACHE][EntityActionTypes.Load]).toEqual(factory);
  });

  it(`should return an action factory that creates the appropriate action object`, () => {
    const factory = cacheOnType(Test, EntityActionTypes.Load, () => defineTypedFactoryFunction(
      setActionType(EntityActionTypes.Load, Test),
      ({ keys, criteria, correlationId }: LoadProps) => new Load(Test, keys, criteria, correlationId)
    ));

    const action = factory({ keys: 101, criteria: { order: -1 }, correlationId: 'test123' });

    expect(action).toBeTruthy();
    expect(action).not.toBeFunction();
    expect(action.type).toBe('[Test] (Generic) Load');
    expect(action.keys).toBe(101);
    expect(action.criteria).toEqual({ order: -1 });
    expect(action.correlationId).toBe('test123');
  });
});
