import { hot } from 'jasmine-marbles';

import { EntityActionTypes } from '../actions/action-types';
import { Clear } from '../actions/actions';
import { all, curd, except, extra, loads, matching } from './effect-exclusion-utils';
import { Entity } from './entity';
import { shouldApplyEffect } from './entity-operators';
import { ENTITY_OPTS_PROP } from './entity-tokens';
import { Key } from './key';

describe('Function: except', () => {
  test('should return function if called partially', () => {
    const exceptFunc = except();
    expect(exceptFunc).toBeInstanceOf(Function);
  });

  test('should return empty object if no actions or defaults', () => {
    const exceptions = except()();
    expect(exceptions).toEqual({});
  });

  test('should return map of actions to false if only defaults', () => {
    const exceptions = except({
      [EntityActionTypes.Clear]: true
    })();
    expect(exceptions).toEqual({
      [EntityActionTypes.Clear]: true
    });
  });

  test('should return map of actions to false if only actions', () => {
    const exceptions = except()(EntityActionTypes.Clear);
    expect(exceptions).toEqual({
      [EntityActionTypes.Clear]: false
    });
  });

  test('should return map of actions to booleans if actions & defaults', () => {
    const exceptions = except({
      [EntityActionTypes.Load]: true
    })(EntityActionTypes.LoadAll);
    expect(exceptions).toEqual({
      [EntityActionTypes.Load]: true,
      [EntityActionTypes.LoadAll]: false
    });
  });
});

describe('Function: matching', () => {
  test('should return empty object if no actions', () => {
    const matches = matching();
    expect(matches).toEqual({});
  });

  test('should return map of action to true if one action', () => {
    const matches = matching(EntityActionTypes.Clear);
    expect(matches).toEqual({
      [EntityActionTypes.Clear]: true
    });
  });

  test('should return map of actions to true if many actions', () => {
    const matches = matching(EntityActionTypes.Load, EntityActionTypes.LoadAll, EntityActionTypes.LoadMany);
    expect(matches).toEqual({
      [EntityActionTypes.Load]: true,
      [EntityActionTypes.LoadAll]: true,
      [EntityActionTypes.LoadMany]: true
    });
  });
});

describe('Utility: all', () => {
  test('should return all initiating actions as map to true', () => {
    const ALL = {
      [EntityActionTypes.Load]: true,
      [EntityActionTypes.LoadAll]: true,
      [EntityActionTypes.LoadMany]: true,
      [EntityActionTypes.LoadPage]: true,
      [EntityActionTypes.LoadRange]: true,
      [EntityActionTypes.Create]: true,
      [EntityActionTypes.CreateMany]: true,
      [EntityActionTypes.Update]: true,
      [EntityActionTypes.UpdateMany]: true,
      [EntityActionTypes.Replace]: true,
      [EntityActionTypes.ReplaceMany]: true,
      [EntityActionTypes.Delete]: true,
      [EntityActionTypes.DeleteMany]: true,
      [EntityActionTypes.DeleteByKey]: true,
      [EntityActionTypes.DeleteManyByKeys]: true,
      [EntityActionTypes.Select]: true,
      [EntityActionTypes.SelectMany]: true,
      [EntityActionTypes.SelectByKey]: true,
      [EntityActionTypes.SelectManyByKeys]: true,
      [EntityActionTypes.Deselect]: true,
      [EntityActionTypes.DeselectMany]: true,
      [EntityActionTypes.DeselectManyByKeys]: true,
      [EntityActionTypes.DeselectAll]: true,
      [EntityActionTypes.Clear]: true,
      except: expect.any(Function)
    };
    expect(all).toEqual(ALL);
  });

  test('should return all as map to true except exceptions as map to false', () => {
    const EXCEPTED = {
      [EntityActionTypes.Load]: false,
      [EntityActionTypes.LoadAll]: true,
      [EntityActionTypes.LoadMany]: true,
      [EntityActionTypes.LoadPage]: true,
      [EntityActionTypes.LoadRange]: true,
      [EntityActionTypes.Create]: true,
      [EntityActionTypes.CreateMany]: true,
      [EntityActionTypes.Update]: true,
      [EntityActionTypes.UpdateMany]: true,
      [EntityActionTypes.Replace]: true,
      [EntityActionTypes.ReplaceMany]: true,
      [EntityActionTypes.Delete]: true,
      [EntityActionTypes.DeleteMany]: true,
      [EntityActionTypes.DeleteByKey]: true,
      [EntityActionTypes.DeleteManyByKeys]: true,
      [EntityActionTypes.Select]: true,
      [EntityActionTypes.SelectMany]: true,
      [EntityActionTypes.SelectByKey]: true,
      [EntityActionTypes.SelectManyByKeys]: true,
      [EntityActionTypes.Deselect]: true,
      [EntityActionTypes.DeselectMany]: true,
      [EntityActionTypes.DeselectManyByKeys]: true,
      [EntityActionTypes.DeselectAll]: true,
      [EntityActionTypes.Clear]: false
    };
    expect(all.except(EntityActionTypes.Clear, EntityActionTypes.Load)).toEqual(EXCEPTED);
  });
});

describe('Utility: extra', () => {
  test('should return extra initiating actions as map to true', () => {
    const EXTRA = {
      [EntityActionTypes.Select]: true,
      [EntityActionTypes.SelectMany]: true,
      [EntityActionTypes.SelectByKey]: true,
      [EntityActionTypes.SelectManyByKeys]: true,
      [EntityActionTypes.Deselect]: true,
      [EntityActionTypes.DeselectMany]: true,
      [EntityActionTypes.DeselectManyByKeys]: true,
      [EntityActionTypes.DeselectAll]: true,
      [EntityActionTypes.Clear]: true,
      except: expect.any(Function)
    };
    expect(extra).toEqual(EXTRA);
  });

  test('should return extra as map to true except exceptions as map to false', () => {
    const EXCEPTED = {
      [EntityActionTypes.Select]: true,
      [EntityActionTypes.SelectMany]: true,
      [EntityActionTypes.SelectByKey]: true,
      [EntityActionTypes.SelectManyByKeys]: true,
      [EntityActionTypes.Deselect]: true,
      [EntityActionTypes.DeselectMany]: true,
      [EntityActionTypes.DeselectManyByKeys]: true,
      [EntityActionTypes.DeselectAll]: true,
      [EntityActionTypes.Clear]: false
    };
    expect(extra.except(EntityActionTypes.Clear)).toEqual(EXCEPTED);
  });
});

describe('Utility: loads', () => {
  test('should return loads initiating actions as map to true', () => {
    const EXTRA = {
      [EntityActionTypes.Load]: true,
      [EntityActionTypes.LoadAll]: true,
      [EntityActionTypes.LoadMany]: true,
      [EntityActionTypes.LoadPage]: true,
      [EntityActionTypes.LoadRange]: true,
      except: expect.any(Function)
    };
    expect(loads).toEqual(EXTRA);
  });

  test('should return loads as map to true except exceptions as map to false', () => {
    const EXCEPTED = {
      [EntityActionTypes.Load]: false,
      [EntityActionTypes.LoadAll]: true,
      [EntityActionTypes.LoadMany]: true,
      [EntityActionTypes.LoadPage]: true,
      [EntityActionTypes.LoadRange]: true
    };
    expect(loads.except(EntityActionTypes.Load)).toEqual(EXCEPTED);
  });
});

describe('Utility: curd', () => {
  test('should return curd initiating actions as map to true', () => {
    const EXTRA = {
      [EntityActionTypes.Create]: true,
      [EntityActionTypes.CreateMany]: true,
      [EntityActionTypes.Update]: true,
      [EntityActionTypes.UpdateMany]: true,
      [EntityActionTypes.Replace]: true,
      [EntityActionTypes.ReplaceMany]: true,
      [EntityActionTypes.Delete]: true,
      [EntityActionTypes.DeleteMany]: true,
      [EntityActionTypes.DeleteByKey]: true,
      [EntityActionTypes.DeleteManyByKeys]: true,
      except: expect.any(Function)
    };
    expect(curd).toEqual(EXTRA);
  });

  test('should return curd as map to true except exceptions as map to false', () => {
    const EXCEPTED = {
      [EntityActionTypes.Create]: false,
      [EntityActionTypes.CreateMany]: true,
      [EntityActionTypes.Update]: true,
      [EntityActionTypes.UpdateMany]: true,
      [EntityActionTypes.Replace]: true,
      [EntityActionTypes.ReplaceMany]: true,
      [EntityActionTypes.Delete]: false,
      [EntityActionTypes.DeleteMany]: true,
      [EntityActionTypes.DeleteByKey]: true,
      [EntityActionTypes.DeleteManyByKeys]: true
    };
    expect(curd.except(EntityActionTypes.Create, EntityActionTypes.Delete)).toEqual(EXCEPTED);
  });
});

describe('Constant: ENTITY_OPTS_PROP', () => {
  test('should equal "__nae_entity_opts"', () => {
    expect(ENTITY_OPTS_PROP).toBe('__nae_entity_opts');
  });
});

describe('Decorator: @Entity', () => {
  test('should decorate model type with uneditable "__nae_entity_opts" property', () => {
    @Entity({ modelName: 'Model' })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP]).toBeTruthy();
    expect(() => {
      Model[ENTITY_OPTS_PROP] = '';
    }).toThrow();
  });

  test('should add custom pluralized name to entity options', () => {
    @Entity({ modelName: 'Model', pluralName: 'Models' })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].pluralName).toBe('Models');
  });

  test('should add custom uri name to entity options', () => {
    @Entity({ modelName: 'Model', uriName: 'modeling' })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].uriName).toBe('modeling');
  });

  test('should add all effects as exclusions', () => {
    @Entity({ modelName: 'Model', excludeEffects: all })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].excludeEffects).toBe(all);
  });

  test('should add all effects except Clear as exclusions', () => {
    @Entity({ modelName: 'Model', excludeEffects: all.except(EntityActionTypes.Clear) })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].excludeEffects).toEqual(all.except(EntityActionTypes.Clear));
  });

  test('should add loads effects as exclusions', () => {
    @Entity({ modelName: 'Model', excludeEffects: loads })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].excludeEffects).toBe(loads);
  });

  test('should add loads effects except Load as exclusions', () => {
    @Entity({ modelName: 'Model', excludeEffects: loads.except(EntityActionTypes.Load) })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].excludeEffects).toEqual(loads.except(EntityActionTypes.Load));
  });

  test('should add curd effects as exclusions', () => {
    @Entity({ modelName: 'Model', excludeEffects: curd })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].excludeEffects).toBe(curd);
  });

  test('should add curd effects except Create as exclusions', () => {
    @Entity({ modelName: 'Model', excludeEffects: curd.except(EntityActionTypes.Create) })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].excludeEffects).toEqual(curd.except(EntityActionTypes.Create));
  });

  test('should add extra effects as exclusions', () => {
    @Entity({ modelName: 'Model', excludeEffects: extra })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].excludeEffects).toBe(extra);
  });

  test('should add extra effects except Select as exclusions', () => {
    @Entity({ modelName: 'Model', excludeEffects: extra.except(EntityActionTypes.Select) })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].excludeEffects).toEqual(extra.except(EntityActionTypes.Select));
  });

  test('should add matching effects as exclusions', () => {
    @Entity({
      modelName: 'Model',
      excludeEffects: matching(EntityActionTypes.Select, EntityActionTypes.Clear, EntityActionTypes.Load)
    })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].excludeEffects).toEqual(
      matching(EntityActionTypes.Select, EntityActionTypes.Clear, EntityActionTypes.Load)
    );
  });

  test('should include transformations listed in decorator', () => {
    const xform1 = { fromServer: data => data, toServer: data => data };
    const xform2 = {
      fromServer: data => ((data.prop = +data.prop), data),
      toServer: data => ((data.prop = data.prop.toString()), data)
    };

    @Entity({
      modelName: 'Model',
      transform: [xform1, xform2]
    })
    class Model {
      prop: number;
    }

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].transform).toEqual([xform1, xform2]);
  });
});

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
