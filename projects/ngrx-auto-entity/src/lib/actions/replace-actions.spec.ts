import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { IEntityError } from '../service/wrapper-models';
import { EntityActionTypes } from './action-types';
import { Replace, ReplaceFailure, ReplaceMany, ReplaceManyFailure, ReplaceManySuccess, ReplaceSuccess } from './replace-actions';

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

  describe('Actions: Replace', () => {
    describe('Replace', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new Replace(TestEntity, fyneman);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace');
        expect(action.actionType).toEqual(EntityActionTypes.Replace);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new Replace(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace');
        expect(action.actionType).toEqual(EntityActionTypes.Replace);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('ReplaceSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new ReplaceSuccess(TestEntity, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace: Success');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entity).toEqual(fyneman);
      });
    });

    describe('ReplaceFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new ReplaceFailure(TestEntity, testError, fyneman, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entity).toEqual(fyneman);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });

  describe('Actions: ReplaceMany', () => {
    describe('ReplaceMany', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new ReplaceMany(TestEntity, scientists);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace Many');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new ReplaceMany(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace Many');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('ReplaceManySuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new ReplaceManySuccess(TestEntity, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entities).toEqual(scientists);
      });
    });

    describe('ReplaceManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new ReplaceManyFailure(TestEntity, testError, scientists, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.entities).toEqual(scientists);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });
});
