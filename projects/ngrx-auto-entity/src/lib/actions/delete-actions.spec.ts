import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { IEntityError } from '../service/wrapper-models';
import { EntityActionTypes } from './action-types';
import { Delete, DeleteFailure, DeleteMany, DeleteManyFailure, DeleteManySuccess, DeleteSuccess } from './delete-actions';

@Entity({
  modelName: 'TestEntity'
})
class TestEntity {
  @Key id: number;
  firstName: string;
  lastName: string;
}

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

const scientists: TestEntity[] = [fyneman, einstein];

const testError: IEntityError = {
  info: {
    modelName: '',
    modelType: TestEntity
  },
  message: 'Test error'
};

const criteria = { criteria: 'test' };

describe('NgRX Auto-Entity: Actions', () => {
  // eslint-disable-next-line prefer-const
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
    });
  });

  describe('Actions: Delete', () => {
    describe('Delete', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new Delete(TestEntity, fyneman);

        expect(action.type).toEqual('[TestEntity] (Generic) Delete');
        expect(action.actionType).toEqual(EntityActionTypes.Delete);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new Delete(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Delete');
        expect(action.actionType).toEqual(EntityActionTypes.Delete);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('DeleteSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new DeleteSuccess(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Delete: Success');
        expect(action.actionType).toEqual(EntityActionTypes.DeleteSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entity).toEqual(fyneman);
      });
    });

    describe('DeleteFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new DeleteFailure(TestEntity, testError, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Delete: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.DeleteFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });

  describe('Actions: DeleteMany', () => {
    describe('DeleteMany', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new DeleteMany(TestEntity, scientists);

        expect(action.type).toEqual('[TestEntity] (Generic) Delete Many');
        expect(action.actionType).toEqual(EntityActionTypes.DeleteMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new DeleteMany(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Delete Many');
        expect(action.actionType).toEqual(EntityActionTypes.DeleteMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('DeleteManySuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new DeleteManySuccess(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Delete Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.DeleteManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entities).toEqual(scientists);
      });
    });

    describe('DeleteManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new DeleteManyFailure(TestEntity, testError, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Delete Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.DeleteManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });
});
