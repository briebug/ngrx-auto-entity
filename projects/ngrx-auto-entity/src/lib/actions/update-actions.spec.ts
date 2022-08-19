import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { IEntityError } from '../service/wrapper-models';
import { EntityActionTypes } from './action-types';
import { Update, UpdateFailure, UpdateMany, UpdateManyFailure, UpdateManySuccess, UpdateSuccess } from './update-actions';

@Entity({
  modelName: 'TestEntity',
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

  describe('Actions: Update', () => {
    describe('Update', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new Update(TestEntity, fyneman);

        expect(action.type).toEqual('[TestEntity] (Generic) Update');
        expect(action.actionType).toEqual(EntityActionTypes.Update);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new Update(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Update');
        expect(action.actionType).toEqual(EntityActionTypes.Update);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('UpdateSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpdateSuccess(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Update: Success');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entity).toEqual(fyneman);
      });
    });

    describe('UpdateFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpdateFailure(TestEntity, testError, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Update: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });

  describe('Actions: UpdateMany', () => {
    describe('UpdateMany', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpdateMany(TestEntity, scientists);

        expect(action.type).toEqual('[TestEntity] (Generic) Update Many');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new UpdateMany(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Update Many');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('UpdateManySuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpdateManySuccess(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Update Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entities).toEqual(scientists);
      });
    });

    describe('UpdateManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpdateManyFailure(TestEntity, testError, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Update Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });
});
