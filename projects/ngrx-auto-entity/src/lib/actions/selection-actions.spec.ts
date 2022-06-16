import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { EntityActionTypes } from './action-types';
import { Deselect, DeselectAll, Deselected, DeselectedMany, DeselectMany, DeselectManyByKeys } from './deselection-actions';
import { Select, SelectByKey, SelectMany, SelectManyByKeys, SelectMore, SelectMoreByKeys } from './selection-actions';

@Entity({
  modelName: 'TestEntity',
})
class TestEntity {
  @Key id: number;
  firstName: string;
  lastName: string;
}

const brian: TestEntity = {
  id: 1,
  firstName: 'Brian',
  lastName: 'Love'
};

const jon: TestEntity = {
  id: 2,
  firstName: 'Jon',
  lastName: 'Rista'
};

const fyneman: TestEntity = {
  id: 3,
  firstName: 'Richard',
  lastName: 'Feynman'
};

const einstein: TestEntity = {
  id: 6,
  firstName: 'Albert',
  lastName: 'Einstein'
};

const developers: TestEntity[] = [brian, jon];
const scientists: TestEntity[] = [fyneman, einstein];

describe('NgRx Auto-Entity: Selection Actions', () => {
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
    });
  });

  describe('Action: Select', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new Select(TestEntity, fyneman);

      expect(action.type).toEqual('[TestEntity] (Generic) Select');
      expect(action.actionType).toEqual(EntityActionTypes.Select);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entity).toEqual(fyneman);
    });
  });

  describe('Action: SelectMany', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new SelectMany(TestEntity, scientists);

      expect(action.type).toEqual('[TestEntity] (Generic) Select Many');
      expect(action.actionType).toEqual(EntityActionTypes.SelectMany);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entities).toEqual(scientists);
    });

    it('should throw error during construction if non-array (object) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectMany(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! SelectMany action requires an array of entities.'));
    });

    it('should throw error during construction if non-array (null) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectMany(TestEntity, null);
      }).toThrow(new Error('[NGRX-AE] ! SelectMany action requires an array of entities.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectMany(TestEntity, undefined);
      }).toThrow(new Error('[NGRX-AE] ! SelectMany action requires an array of entities.'));
    });
  });

  describe('Action: SelectMore', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new SelectMore(TestEntity, scientists);

      expect(action.type).toEqual('[TestEntity] (Generic) Select More');
      expect(action.actionType).toEqual(EntityActionTypes.SelectMore);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entities).toEqual(scientists);
    });

    it('should throw error during construction if non-array (object) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectMore(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! SelectMore action requires an array of entities.'));
    });

    it('should throw error during construction if non-array (null) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectMore(TestEntity, null);
      }).toThrow(new Error('[NGRX-AE] ! SelectMore action requires an array of entities.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectMore(TestEntity, undefined);
      }).toThrow(new Error('[NGRX-AE] ! SelectMore action requires an array of entities.'));
    });
  });

  describe('Action: SelectByKey', () => {
    it('should construct EntityAction with proper details (number key)', () => {
      const action = new SelectByKey(TestEntity, 1);

      expect(action.type).toEqual('[TestEntity] (Generic) Select by Key');
      expect(action.actionType).toEqual(EntityActionTypes.SelectByKey);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entityKey).toEqual(1);
    });

    it('should construct EntityAction with proper details (string key)', () => {
      const action = new SelectByKey(TestEntity, 'key');

      expect(action.type).toEqual('[TestEntity] (Generic) Select by Key');
      expect(action.actionType).toEqual(EntityActionTypes.SelectByKey);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entityKey).toEqual('key');
    });
  });

  describe('Action: SelectManyByKeys', () => {
    it('should construct EntityAction with proper details (number keys)', () => {
      const action = new SelectManyByKeys(TestEntity, [1, 2]);

      expect(action.type).toEqual('[TestEntity] (Generic) Select Many by Keys');
      expect(action.actionType).toEqual(EntityActionTypes.SelectManyByKeys);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entitiesKeys).toEqual([1, 2]);
    });

    it('should construct EntityAction with proper details (string keys)', () => {
      const action = new SelectManyByKeys(TestEntity, ['key_a', 'key_b']);

      expect(action.type).toEqual('[TestEntity] (Generic) Select Many by Keys');
      expect(action.actionType).toEqual(EntityActionTypes.SelectManyByKeys);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entitiesKeys).toEqual(['key_a', 'key_b']);
    });

    it('should throw error during construction if non-array (object) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectManyByKeys(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! SelectManyByKeys action requires an array of entity keys.'));
    });

    it('should throw error during construction if non-array (null) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectManyByKeys(TestEntity, null);
      }).toThrow(new Error('[NGRX-AE] ! SelectManyByKeys action requires an array of entity keys.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectManyByKeys(TestEntity, undefined);
      }).toThrow(new Error('[NGRX-AE] ! SelectManyByKeys action requires an array of entity keys.'));
    });
  });

  describe('Action: SelectMoreByKeys', () => {
    it('should construct EntityAction with proper details (number keys)', () => {
      const action = new SelectMoreByKeys(TestEntity, [1, 2]);

      expect(action.type).toEqual('[TestEntity] (Generic) Select More by Keys');
      expect(action.actionType).toEqual(EntityActionTypes.SelectMoreByKeys);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entitiesKeys).toEqual([1, 2]);
    });

    it('should construct EntityAction with proper details (string keys)', () => {
      const action = new SelectMoreByKeys(TestEntity, ['key_a', 'key_b']);

      expect(action.type).toEqual('[TestEntity] (Generic) Select More by Keys');
      expect(action.actionType).toEqual(EntityActionTypes.SelectMoreByKeys);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entitiesKeys).toEqual(['key_a', 'key_b']);
    });

    it('should throw error during construction if non-array (object) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectMoreByKeys(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! SelectMoreByKeys action requires an array of entity keys.'));
    });

    it('should throw error during construction if non-array (null) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectMoreByKeys(TestEntity, null);
      }).toThrow(new Error('[NGRX-AE] ! SelectMoreByKeys action requires an array of entity keys.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new SelectMoreByKeys(TestEntity, undefined);
      }).toThrow(new Error('[NGRX-AE] ! SelectMoreByKeys action requires an array of entity keys.'));
    });
  });
});
