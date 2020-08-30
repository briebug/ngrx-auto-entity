import { EntityActionTypes } from '../actions/action-types';
import { all, curd, extra, loads, matching } from './effect-exclusion-utils';
import { Entity } from './entity-decorator';
import { EntityAge } from './entity-options';
import { ENTITY_OPTS_PROP } from './entity-tokens';

describe('Decorator: @Entity', () => {
  test('should decorate model type with un-editable "__nae_entity_opts" property', () => {
    @Entity({ modelName: 'Model' })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP]).toBeTruthy();
    expect(() => {
      Model[ENTITY_OPTS_PROP] = '';
    }).toThrow();
  });

  test('should add required modelName property to entity options from options object', () => {
    @Entity({ modelName: 'Model' })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
  });

  test('should add required modelName property to entity options from string name', () => {
    @Entity('Model')
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
  });

  test('should add required modelName and additional options properties to entity options from string name and additional options object', () => {
    @Entity('Model', {
      pluralName: 'Models',
      uriName: 'models'
    })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP]).toMatchObject({
      modelName: 'Model',
      pluralName: 'Models',
      uriName: 'models'
    });
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

  test('should add defaultMaxAge to entity options', () => {
    @Entity({ modelName: 'Model', defaultMaxAge: EntityAge.Day })
    class Model {}

    expect(Model[ENTITY_OPTS_PROP].modelName).toBe('Model');
    expect(Model[ENTITY_OPTS_PROP].defaultMaxAge).toBe(86400);
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
