import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import {
  Create,
  CreateFailure,
  CreateSuccess,
  EntityActionTypes,
  Load,
  LoadAll,
  LoadAllFailure,
  LoadAllSuccess,
  LoadFailure,
  LoadMany,
  LoadManyFailure,
  LoadManySuccess,
  LoadPage,
  LoadPageSuccess,
  LoadRange,
  LoadRangeFailure,
  LoadRangeSuccess,
  LoadSuccess,
  ofEntityType
} from './actions';
import { Key } from './decorators';

class TestEntity {
  @Key id: 1;
  firstName: 'Brian';
  lastName: 'Love';
}

describe('NgRX Auto-Entity: Actions', () => {
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
    });
  });

  describe('Load', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new Load(TestEntity, 1);

      expect(load.type).toEqual('[TestEntity] Generic Load');
      expect(load.actionType).toEqual(EntityActionTypes.Load);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.keys).toEqual(1);
    });

    it('should construct EntityAction with proper details and criteria', () => {
      const load = new Load(TestEntity, 1, { criteria: 'test' });

      expect(load.type).toEqual('[TestEntity] Generic Load');
      expect(load.actionType).toEqual(EntityActionTypes.Load);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.keys).toEqual(1);
      expect(load.criteria).toEqual({ criteria: 'test' });
    });
  });

  describe('LoadSuccess', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadSuccess(TestEntity, {
        id: 2,
        firstName: 'Jon',
        lastName: 'Rista'
      });

      expect(load.type).toEqual('[TestEntity] Generic Load: Success');
      expect(load.actionType).toEqual(EntityActionTypes.LoadSuccess);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.entity).toEqual({
        id: 2,
        firstName: 'Jon',
        lastName: 'Rista'
      });
    });
  });

  describe('LoadFailure', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadFailure(TestEntity, {
        status: 500,
        error: {
          message: 'Test error'
        }
      });

      expect(load.type).toEqual('[TestEntity] Generic Load: Failure');
      expect(load.actionType).toEqual(EntityActionTypes.LoadFailure);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.error).toEqual({
        status: 500,
        error: {
          message: 'Test error'
        }
      });
    });
  });

  describe('LoadMany', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadMany(TestEntity, 'test');

      expect(load.type).toEqual('[TestEntity] Generic Load Many');
      expect(load.actionType).toEqual(EntityActionTypes.LoadMany);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.criteria).toEqual('test');
    });
  });

  describe('LoadManySuccess', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadManySuccess(TestEntity, [
        {
          id: 2,
          firstName: 'Jon',
          lastName: 'Rista'
        }
      ]);

      expect(load.type).toEqual('[TestEntity] Generic Load Many: Success');
      expect(load.actionType).toEqual(EntityActionTypes.LoadManySuccess);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.entities).toEqual([
        {
          id: 2,
          firstName: 'Jon',
          lastName: 'Rista'
        }
      ]);
    });
  });

  describe('LoadManyFailure', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadManyFailure(TestEntity, {
        status: 500,
        error: {
          message: 'Test error'
        }
      });

      expect(load.type).toEqual('[TestEntity] Generic Load Many: Failure');
      expect(load.actionType).toEqual(EntityActionTypes.LoadManyFailure);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.error).toEqual({
        status: 500,
        error: {
          message: 'Test error'
        }
      });
    });
  });

  describe('LoadAll', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadAll(TestEntity, 'test');

      expect(load.type).toEqual('[TestEntity] Generic Load All');
      expect(load.actionType).toEqual(EntityActionTypes.LoadAll);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.criteria).toEqual('test');
    });
  });

  describe('LoadAllSuccess', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadAllSuccess(TestEntity, [
        {
          id: 2,
          firstName: 'Jon',
          lastName: 'Rista'
        }
      ]);

      expect(load.type).toEqual('[TestEntity] Generic Load All: Success');
      expect(load.actionType).toEqual(EntityActionTypes.LoadAllSuccess);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.entities).toEqual([
        {
          id: 2,
          firstName: 'Jon',
          lastName: 'Rista'
        }
      ]);
    });
  });

  describe('LoadAllFailure', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadAllFailure(TestEntity, {
        status: 500,
        error: {
          message: 'Test error'
        }
      });

      expect(load.type).toEqual('[TestEntity] Generic Load All: Failure');
      expect(load.actionType).toEqual(EntityActionTypes.LoadAllFailure);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.error).toEqual({
        status: 500,
        error: {
          message: 'Test error'
        }
      });
    });
  });

  describe('LoadPage', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadPage(TestEntity, { page: 2, size: 10 });

      expect(load.type).toEqual('[TestEntity] Generic Load Page');
      expect(load.actionType).toEqual(EntityActionTypes.LoadPage);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.page).toEqual({ page: 2, size: 10 });
    });

    it('should construct EntityAction with proper details and criteria', () => {
      const load = new LoadPage(TestEntity, { page: 2, size: 10 }, { criteria: 'test' });

      expect(load.type).toEqual('[TestEntity] Generic Load Page');
      expect(load.actionType).toEqual(EntityActionTypes.LoadPage);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.page).toEqual({ page: 2, size: 10 });
      expect(load.criteria).toEqual({ criteria: 'test' });
    });
  });

  describe('LoadPageSuccess', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadPageSuccess(
        TestEntity,
        [
          {
            id: 1,
            firstName: 'Brian',
            lastName: 'Love'
          },
          {
            id: 2,
            firstName: 'Jon',
            lastName: 'Rista'
          }
        ],
        {
          page: { page: 1, size: 2 },
          totalCount: 10
        }
      );

      expect(load.type).toEqual('[TestEntity] Generic Load Page: Success');
      expect(load.actionType).toEqual(EntityActionTypes.LoadPageSuccess);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.entities).toEqual([
        {
          id: 1,
          firstName: 'Brian',
          lastName: 'Love'
        },
        {
          id: 2,
          firstName: 'Jon',
          lastName: 'Rista'
        }
      ]);
      expect(load.pageInfo).toEqual({
        page: 1,
        totalCount: 10
      });
    });
  });

  describe('LoadPageFailure', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadAllFailure(TestEntity, {
        status: 500,
        error: {
          message: 'Test error'
        }
      });

      expect(load.type).toEqual('[TestEntity] Generic Load All: Failure');
      expect(load.actionType).toEqual(EntityActionTypes.LoadAllFailure);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.error).toEqual({
        status: 500,
        error: {
          message: 'Test error'
        }
      });
    });
  });

  describe('LoadRange', () => {
    it('should construct EntityAction with proper details for start/end range', () => {
      const load = new LoadRange(TestEntity, { start: 10, end: 20 });

      expect(load.type).toEqual('[TestEntity] Generic Load Range');
      expect(load.actionType).toEqual(EntityActionTypes.LoadRange);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.range).toEqual({ start: 10, end: 20 });
    });

    it('should construct EntityAction with proper details and criteria for start/end range', () => {
      const load = new LoadRange(TestEntity, { start: 10, end: 20 }, { criteria: 'test' });

      expect(load.type).toEqual('[TestEntity] Generic Load Range');
      expect(load.actionType).toEqual(EntityActionTypes.LoadRange);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.range).toEqual({ start: 10, end: 20 });
      expect(load.criteria).toEqual({ criteria: 'test' });
    });

    it('should construct EntityAction with proper details for first/last range', () => {
      const load = new LoadRange(TestEntity, { first: 10, last: 20 });

      expect(load.type).toEqual('[TestEntity] Generic Load Range');
      expect(load.actionType).toEqual(EntityActionTypes.LoadRange);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.range).toEqual({ first: 10, last: 20 });
    });

    it('should construct EntityAction with proper details and criteria for first/last range', () => {
      const load = new LoadRange(TestEntity, { first: 10, last: 20 }, { criteria: 'test' });

      expect(load.type).toEqual('[TestEntity] Generic Load Range');
      expect(load.actionType).toEqual(EntityActionTypes.LoadRange);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.range).toEqual({ first: 10, last: 20 });
      expect(load.criteria).toEqual({ criteria: 'test' });
    });

    it('should construct EntityAction with proper details for skip/take range', () => {
      const load = new LoadRange(TestEntity, { skip: 10, take: 10 });

      expect(load.type).toEqual('[TestEntity] Generic Load Range');
      expect(load.actionType).toEqual(EntityActionTypes.LoadRange);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.range).toEqual({ skip: 10, take: 10 });
    });

    it('should construct EntityAction with proper details and criteria for skip/take range', () => {
      const load = new LoadRange(TestEntity, { skip: 10, take: 10 }, { criteria: 'test' });

      expect(load.type).toEqual('[TestEntity] Generic Load Range');
      expect(load.actionType).toEqual(EntityActionTypes.LoadRange);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.range).toEqual({ skip: 10, take: 10 });
      expect(load.criteria).toEqual({ criteria: 'test' });
    });
  });

  describe('LoadRangeSuccess', () => {
    it('should construct EntityAction with proper details for start/end range', () => {
      const load = new LoadRangeSuccess(
        TestEntity,
        [
          {
            id: 1,
            firstName: 'Brian',
            lastName: 'Love'
          },
          {
            id: 2,
            firstName: 'Jon',
            lastName: 'Rista'
          }
        ],
        {
          range: {
            start: 1,
            end: 10
          },
          totalCount: 2
        }
      );

      expect(load.type).toEqual('[TestEntity] Generic Load Range: Success');
      expect(load.actionType).toEqual(EntityActionTypes.LoadRangeSuccess);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.entities).toEqual([
        {
          id: 1,
          firstName: 'Brian',
          lastName: 'Love'
        },
        {
          id: 2,
          firstName: 'Jon',
          lastName: 'Rista'
        }
      ]);
      expect(load.rangeInfo).toEqual({
        range: {
          start: 1,
          end: 10
        },
        totalCount: 2
      });
    });
  });

  describe('LoadRangeFailure', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new LoadRangeFailure(TestEntity, {
        status: 500,
        error: {
          message: 'Test error'
        }
      });

      expect(load.type).toEqual('[TestEntity] Generic Load Range: Failure');
      expect(load.actionType).toEqual(EntityActionTypes.LoadRangeFailure);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.error).toEqual({
        status: 500,
        error: {
          message: 'Test error'
        }
      });
    });
  });

  describe('Create', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new Create(TestEntity, {
        id: 3,
        firstName: 'Richard',
        lastName: 'Feynman'
      });

      expect(load.type).toEqual('[TestEntity] Generic Create');
      expect(load.actionType).toEqual(EntityActionTypes.Create);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.entity).toEqual({
        id: 3,
        firstName: 'Richard',
        lastName: 'Feynman'
      });
    });

    it('should construct EntityAction with proper details and criteria', () => {
      const load = new Create(
        TestEntity,
        {
          id: 3,
          firstName: 'Richard',
          lastName: 'Feynman'
        },
        { criteria: 'test' }
      );

      expect(load.type).toEqual('[TestEntity] Generic Create');
      expect(load.actionType).toEqual(EntityActionTypes.Create);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.entity).toEqual({
        id: 3,
        firstName: 'Richard',
        lastName: 'Feynman'
      });
      expect(load.criteria).toEqual({ criteria: 'test' });
    });
  });

  describe('CreateSuccess', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new CreateSuccess(TestEntity, {
        id: 3,
        firstName: 'Richard',
        lastName: 'Feynman'
      });

      expect(load.type).toEqual('[TestEntity] Generic Create: Success');
      expect(load.actionType).toEqual(EntityActionTypes.CreateSuccess);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.entity).toEqual({
        id: 3,
        firstName: 'Richard',
        lastName: 'Feynman'
      });
    });
  });

  describe('CreateFailure', () => {
    it('should construct EntityAction with proper details', () => {
      const load = new CreateFailure(TestEntity, {
        status: 500,
        error: {
          message: 'Test error'
        }
      });

      expect(load.type).toEqual('[TestEntity] Generic Create: Failure');
      expect(load.actionType).toEqual(EntityActionTypes.CreateFailure);
      expect(load.info.modelType).toEqual(TestEntity);
      expect(load.info.modelName).toEqual('TestEntity');

      expect(load.error).toEqual({
        status: 500,
        error: {
          message: 'Test error'
        }
      });
    });
  });

  it('should ', () => {
    const action = new Load(TestEntity, 'id');

    actions = hot('-a', { a: action });
    actions.pipe(ofEntityType<TestEntity, Load<TestEntity>>(TestEntity, EntityActionTypes.Load)).subscribe(a => {
      expect(a).toEqual(action);
    });
  });
});
