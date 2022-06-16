import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { makeEntity } from '../util/make-entity';
import { EntityActionTypes } from './action-types';
import { Change, Changed, Edit, EditByKey, EditedByKey, EditEnded, EditNew, EndEdit } from './edit-actions';

@Entity({
  modelName: 'TestEntity'
})
class TestEntity {
  @Key id: number;
  firstName: string;
  lastName: string;
}

const makeTestEntity = makeEntity(TestEntity);

describe('NgRX Auto-Entity: Actions', () => {
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
    });
  });

  describe('Action: EditNew', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new EditNew(TestEntity);

      expect(action.type).toEqual('[TestEntity] (Generic) Edit New');
      expect(action.actionType).toEqual(EntityActionTypes.EditNew);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: Edit', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new Edit(TestEntity, makeTestEntity({ id: 1, firstName: 'Test', lastName: 'Entity' }));

      expect(action.type).toEqual('[TestEntity] (Generic) Edit');
      expect(action.actionType).toEqual(EntityActionTypes.Edit);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: EditByKey', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new EditByKey(TestEntity, 1);

      expect(action.type).toEqual('[TestEntity] (Generic) Edit by Key');
      expect(action.actionType).toEqual(EntityActionTypes.EditByKey);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: EditedByKey', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new EditedByKey(TestEntity, 1);

      expect(action.type).toEqual('[TestEntity] (Generic) Edited by Key');
      expect(action.actionType).toEqual(EntityActionTypes.EditedByKey);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: Change', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new Change(TestEntity, makeTestEntity({ id: 1, firstName: 'Test', lastName: 'Entity' }));

      expect(action.type).toEqual('[TestEntity] (Generic) Change');
      expect(action.actionType).toEqual(EntityActionTypes.Change);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: Changed', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new Changed(TestEntity, makeTestEntity({ id: 1, firstName: 'Test', lastName: 'Entity' }));

      expect(action.type).toEqual('[TestEntity] (Generic) Changed');
      expect(action.actionType).toEqual(EntityActionTypes.Changed);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: EndEdit', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new EndEdit(TestEntity);

      expect(action.type).toEqual('[TestEntity] (Generic) Edit: End');
      expect(action.actionType).toEqual(EntityActionTypes.EndEdit);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });

  describe('Action: EditEnded', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new EditEnded(TestEntity);

      expect(action.type).toEqual('[TestEntity] (Generic) Edit: Ended');
      expect(action.actionType).toEqual(EntityActionTypes.EditEnded);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });
});
