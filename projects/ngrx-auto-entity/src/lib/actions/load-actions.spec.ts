import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { IEntityError } from '../service/wrapper-models';
import { EntityActionTypes } from './action-types';
import { Load, LoadFailure, LoadSuccess } from './load-actions';
import { LoadAll, LoadAllFailure, LoadAllSuccess } from './load-all-actions';
import { LoadMany, LoadManyFailure, LoadManySuccess } from './load-many-actions';
import { LoadPage, LoadPageSuccess } from './load-page-actions';
import { LoadRange, LoadRangeFailure, LoadRangeSuccess } from './load-range-actions';

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

const developers: TestEntity[] = [brian, jon];

const testError: IEntityError = {
  info: {
    modelName: '',
    modelType: TestEntity
  },
  message: 'Test error'
};

const criteria = { criteria: 'test' };
const page = { page: 2, size: 10 };
const range = { start: 10, end: 20 };

describe('NgRX Auto-Entity: Actions', () => {
  // eslint-disable-next-line prefer-const
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
    });
  });

  describe('Actions: Load', () => {
    describe('Load', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new Load(TestEntity, 1);

        expect(action.type).toEqual('[TestEntity] (Generic) Load');
        expect(action.actionType).toEqual(EntityActionTypes.Load);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.keys).toEqual(1);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new Load(TestEntity, 1, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load');
        expect(action.actionType).toEqual(EntityActionTypes.Load);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.keys).toEqual(1);
        expect(action.criteria).toEqual(criteria);
      });

      it('should construct EntityAction with optional arguments', () => {
        const action = new Load(TestEntity);

        expect(action.type).toEqual('[TestEntity] (Generic) Load');
        expect(action.actionType).toEqual(EntityActionTypes.Load);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.keys).toEqual(undefined);
      });
    });

    describe('LoadSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const keys = [1, 2];
        const action = new LoadSuccess(TestEntity, jon, keys, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load: Success');
        expect(action.actionType).toEqual(EntityActionTypes.LoadSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.keys).toEqual(keys);
        expect(action.criteria).toEqual(criteria);

        expect(action.entity).toEqual(jon);
      });
    });

    describe('LoadFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const keys = [1, 2];
        const action = new LoadFailure(TestEntity, testError, keys, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.keys).toEqual(keys);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });

  describe('Actions: LoadMany', () => {
    describe('LoadMany', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadMany(TestEntity, 'test');

        expect(action.type).toEqual('[TestEntity] (Generic) Load Many');
        expect(action.actionType).toEqual(EntityActionTypes.LoadMany);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.criteria).toEqual('test');
      });
    });

    describe('LoadManySuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadManySuccess(TestEntity, [jon], criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.LoadManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entities).toEqual([jon]);
      });
    });

    describe('LoadManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadManyFailure(TestEntity, testError, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });

  describe('Actions: LoadAll', () => {
    describe('LoadAll', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadAll(TestEntity, 'test');

        expect(action.type).toEqual('[TestEntity] (Generic) Load All');
        expect(action.actionType).toEqual(EntityActionTypes.LoadAll);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.criteria).toEqual('test');
      });
    });

    describe('LoadAllSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadAllSuccess(TestEntity, [jon], criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load All: Success');
        expect(action.actionType).toEqual(EntityActionTypes.LoadAllSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');
        expect(action.criteria).toEqual(criteria);

        expect(action.entities).toEqual([jon]);
      });
    });

    describe('LoadAllFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadAllFailure(TestEntity, testError, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load All: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadAllFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });

  describe('Actions: LoadPage', () => {
    describe('LoadPage', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadPage(TestEntity, page);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Page');
        expect(action.actionType).toEqual(EntityActionTypes.LoadPage);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.page).toEqual(page);
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new LoadPage(TestEntity, page, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Page');
        expect(action.actionType).toEqual(EntityActionTypes.LoadPage);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.page).toEqual(page);
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('LoadPageSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadPageSuccess(
          TestEntity,
          developers,
          {
            page: { page: 1, size: 2 },
            totalCount: 10
          },
          criteria
        );

        expect(action.type).toEqual('[TestEntity] (Generic) Load Page: Success');
        expect(action.actionType).toEqual(EntityActionTypes.LoadPageSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(developers);
        expect(action.pageInfo).toEqual({
          page: {
            page: 1,
            size: 2
          },
          totalCount: 10
        });
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('LoadPageFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadAllFailure(TestEntity, testError, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load All: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadAllFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });

  describe('Actions: LoadRange', () => {
    describe('LoadRange', () => {
      it('should construct EntityAction with proper details for start/end range', () => {
        const action = new LoadRange(TestEntity, { start: 10, end: 20 });

        expect(action.type).toEqual('[TestEntity] (Generic) Load Range');
        expect(action.actionType).toEqual(EntityActionTypes.LoadRange);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.range).toEqual({ start: 10, end: 20 });
      });

      it('should construct EntityAction with proper details and criteria for start/end range', () => {
        const action = new LoadRange(TestEntity, { start: 10, end: 20 }, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Range');
        expect(action.actionType).toEqual(EntityActionTypes.LoadRange);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.range).toEqual({ start: 10, end: 20 });
        expect(action.criteria).toEqual(criteria);
      });

      it('should construct EntityAction with proper details for first/last range', () => {
        const action = new LoadRange(TestEntity, { first: 10, last: 20 });

        expect(action.type).toEqual('[TestEntity] (Generic) Load Range');
        expect(action.actionType).toEqual(EntityActionTypes.LoadRange);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.range).toEqual({ first: 10, last: 20 });
      });

      it('should construct EntityAction with proper details and criteria for first/last range', () => {
        const action = new LoadRange(TestEntity, { first: 10, last: 20 }, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Range');
        expect(action.actionType).toEqual(EntityActionTypes.LoadRange);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.range).toEqual({ first: 10, last: 20 });
        expect(action.criteria).toEqual(criteria);
      });

      it('should construct EntityAction with proper details for skip/take range', () => {
        const action = new LoadRange(TestEntity, { skip: 10, take: 10 });

        expect(action.type).toEqual('[TestEntity] (Generic) Load Range');
        expect(action.actionType).toEqual(EntityActionTypes.LoadRange);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.range).toEqual({ skip: 10, take: 10 });
      });

      it('should construct EntityAction with proper details and criteria for skip/take range', () => {
        const action = new LoadRange(TestEntity, { skip: 10, take: 10 }, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Range');
        expect(action.actionType).toEqual(EntityActionTypes.LoadRange);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.range).toEqual({ skip: 10, take: 10 });
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('LoadRangeSuccess', () => {
      it('should construct EntityAction with proper details for start/end range', () => {
        const action = new LoadRangeSuccess(
          TestEntity,
          developers,
          {
            range: {
              start: 1,
              end: 10
            },
            totalCount: 2
          },
          criteria
        );

        expect(action.type).toEqual('[TestEntity] (Generic) Load Range: Success');
        expect(action.actionType).toEqual(EntityActionTypes.LoadRangeSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(developers);
        expect(action.rangeInfo).toEqual({
          range: {
            start: 1,
            end: 10
          },
          totalCount: 2
        });
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('LoadRangeFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadRangeFailure(TestEntity, testError, range, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Range: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadRangeFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
        expect(action.range).toEqual(range);
        expect(action.criteria).toEqual(criteria);
      });
    });
  });
});
