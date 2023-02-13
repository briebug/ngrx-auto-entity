import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { IEntityError } from '../service/wrapper-models';
import { EntityActionTypes } from './action-types';
import { Create, CreateFailure, CreateMany, CreateManyFailure, CreateManySuccess, CreateSuccess } from './create-actions';
import { Update, UpdateFailure, UpdateMany, UpdateManyFailure, UpdateManySuccess, UpdateSuccess } from './update-actions';

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

  describe('Actions: Create', () => {
    describe('Create', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new Create(TestEntity, fyneman);

        expect(action.type).toEqual('[TestEntity] (Generic) Create');
        expect(action.actionType).toEqual(EntityActionTypes.Create);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new Create(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Create');
        expect(action.actionType).toEqual(EntityActionTypes.Create);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('CreateSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new CreateSuccess(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Create: Success');
        expect(action.actionType).toEqual(EntityActionTypes.CreateSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entity).toEqual(fyneman);
      });
    });

    describe('CreateFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new CreateFailure(TestEntity, testError, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Create: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.CreateFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });

  describe('Actions: CreateMany', () => {
    describe('CreateMany', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new CreateMany(TestEntity, scientists);

        expect(action.type).toEqual('[TestEntity] (Generic) Create Many');
        expect(action.actionType).toEqual(EntityActionTypes.CreateMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new CreateMany(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Create Many');
        expect(action.actionType).toEqual(EntityActionTypes.CreateMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('CreateManySuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new CreateManySuccess(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Create Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.CreateManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entities).toEqual(scientists);
      });
    });

    describe('CreateManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new CreateManyFailure(TestEntity, testError, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Create Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.CreateManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });
});
