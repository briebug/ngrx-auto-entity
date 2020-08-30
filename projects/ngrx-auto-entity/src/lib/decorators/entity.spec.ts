import { EntityActionTypes } from '../actions/action-types';
import { all, curd, except, extra, loads, matching } from './effect-exclusion-utils';
import { ENTITY_OPTS_PROP } from './entity-tokens';

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
      [EntityActionTypes.Upsert]: true,
      [EntityActionTypes.UpsertMany]: true,
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
      [EntityActionTypes.Upsert]: true,
      [EntityActionTypes.UpsertMany]: true,
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
      [EntityActionTypes.Upsert]: true,
      [EntityActionTypes.UpsertMany]: true,
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
      [EntityActionTypes.Upsert]: true,
      [EntityActionTypes.UpsertMany]: true,
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
