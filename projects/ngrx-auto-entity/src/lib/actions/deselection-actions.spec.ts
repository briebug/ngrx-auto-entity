import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { EntityActionTypes } from './action-types';
import { Deselect, DeselectAll, Deselected, DeselectedMany, DeselectMany, DeselectManyByKeys } from './deselection-actions';

@Entity({
  modelName: 'TestEntity'
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

describe('NgRx Auto-Entity: Deselection Actions', () => {
  // eslint-disable-next-line prefer-const
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
    });
  });

  describe('Action: Deselect', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new Deselect(TestEntity);

      expect(action.type).toEqual('[TestEntity] (Generic) Deselect');
      expect(action.actionType).toEqual(EntityActionTypes.Deselect);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: DeselectMany', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new DeselectMany(TestEntity, scientists);

      expect(action.type).toEqual('[TestEntity] (Generic) Deselect of Many');
      expect(action.actionType).toEqual(EntityActionTypes.DeselectMany);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entities).toEqual(scientists);
    });

    it('should throw error during construction if non-array (object) passed', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        new DeselectMany(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! DeselectMany action requires an array of entities.'));
    });

    it('should throw error during construction if non-array (null) passed', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        new DeselectMany(TestEntity, null);
      }).toThrow(new Error('[NGRX-AE] ! DeselectMany action requires an array of entities.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        new DeselectMany(TestEntity, undefined);
      }).toThrow(new Error('[NGRX-AE] ! DeselectMany action requires an array of entities.'));
    });
  });

  describe('Action: DeselectManyByKeys', () => {
    it('should construct EntityAction with proper details (number keys)', () => {
      const action = new DeselectManyByKeys(TestEntity, [1, 2]);

      expect(action.type).toEqual('[TestEntity] (Generic) Deselect of Many by Keys');
      expect(action.actionType).toEqual(EntityActionTypes.DeselectManyByKeys);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entitiesKeys).toEqual([1, 2]);
    });

    it('should construct EntityAction with proper details (string keys)', () => {
      const action = new DeselectManyByKeys(TestEntity, ['key_a', 'key_b']);

      expect(action.type).toEqual('[TestEntity] (Generic) Deselect of Many by Keys');
      expect(action.actionType).toEqual(EntityActionTypes.DeselectManyByKeys);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entitiesKeys).toEqual(['key_a', 'key_b']);
    });

    it('should throw error during construction if non-array (object) passed', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        new DeselectManyByKeys(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! DeselectManyByKeys action requires an array of entity keys.'));
    });

    it('should throw error during construction if non-array (null) passed', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        new DeselectManyByKeys(TestEntity, null);
      }).toThrow(new Error('[NGRX-AE] ! DeselectManyByKeys action requires an array of entity keys.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        new DeselectManyByKeys(TestEntity, undefined);
      }).toThrow(new Error('[NGRX-AE] ! DeselectManyByKeys action requires an array of entity keys.'));
    });
  });

  describe('Action: DeselectAll', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new DeselectAll(TestEntity);

      expect(action.type).toEqual('[TestEntity] (Generic) Deselect of All');
      expect(action.actionType).toEqual(EntityActionTypes.DeselectAll);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: Deselected', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new Deselected(TestEntity);

      expect(action.type).toEqual('[TestEntity] (Generic) Deselection');
      expect(action.actionType).toEqual(EntityActionTypes.Deselected);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: DeselectedMany', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new DeselectedMany(TestEntity, scientists);

      expect(action.type).toEqual('[TestEntity] (Generic) Deselection of Many');
      expect(action.actionType).toEqual(EntityActionTypes.DeselectedMany);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entities).toEqual(scientists);
    });

    it('should construct EntityAction if null is passed', () => {
      const action = new DeselectedMany(TestEntity, null);

      expect(action.type).toEqual('[TestEntity] (Generic) Deselection of Many');
      expect(action.actionType).toEqual(EntityActionTypes.DeselectedMany);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');

      expect(action.entities).toEqual(null);
    });

    it('should throw error during construction if non-array (object) passed', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        new DeselectedMany(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! DeselectedMany action requires an array of entities or keys.'));
    });

    it('should throw error during construction if non-array (number) passed', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        new DeselectedMany(TestEntity, 2 as any);
      }).toThrow(new Error('[NGRX-AE] ! DeselectedMany action requires an array of entities or keys.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        new DeselectedMany(TestEntity, undefined);
      }).toThrow(new Error('[NGRX-AE] ! DeselectedMany action requires an array of entities or keys.'));
    });
  });
});
