import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { IEntityError } from '../service/wrapper-models';
import { EntityActionTypes } from './action-types';
import { Upsert, UpsertFailure, UpsertMany, UpsertManyFailure, UpsertManySuccess, UpsertSuccess } from './upsert-actions';

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
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
    });
  });

  describe('Actions: Upsert', () => {
    describe('Upsert', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new Upsert(TestEntity, fyneman);

        expect(action.type).toEqual('[TestEntity] (Generic) Upsert');
        expect(action.actionType).toEqual(EntityActionTypes.Upsert);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new Upsert(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Upsert');
        expect(action.actionType).toEqual(EntityActionTypes.Upsert);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('UpsertSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpsertSuccess(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Upsert: Success');
        expect(action.actionType).toEqual(EntityActionTypes.UpsertSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entity).toEqual(fyneman);
      });
    });

    describe('UpsertFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpsertFailure(TestEntity, testError, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Upsert: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.UpsertFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });

  describe('Actions: UpsertMany', () => {
    describe('UpsertMany', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpsertMany(TestEntity, scientists);

        expect(action.type).toEqual('[TestEntity] (Generic) Upsert Many');
        expect(action.actionType).toEqual(EntityActionTypes.UpsertMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new UpsertMany(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Upsert Many');
        expect(action.actionType).toEqual(EntityActionTypes.UpsertMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('UpsertManySuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpsertManySuccess(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Upsert Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.UpsertManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entities).toEqual(scientists);
      });
    });

    describe('UpsertManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpsertManyFailure(TestEntity, testError, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Upsert Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.UpsertManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });
});
