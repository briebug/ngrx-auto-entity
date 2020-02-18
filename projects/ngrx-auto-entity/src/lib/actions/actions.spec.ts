import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { Entity } from '../decorators/entity';
import { Key } from '../decorators/key';
import { fromEntityActions, ofEntityAction, ofEntityType } from './action-operators';
import { EntityActionTypes } from './action-types';
import {
  Clear,
  Create,
  CreateFailure,
  CreateMany,
  CreateManyFailure,
  CreateManySuccess,
  CreateSuccess,
  Deselect,
  DeselectAll,
  Deselected,
  DeselectedMany,
  DeselectMany,
  DeselectManyByKeys,
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
  Replace,
  ReplaceFailure,
  ReplaceMany,
  ReplaceManyFailure,
  ReplaceManySuccess,
  ReplaceSuccess,
  Select,
  SelectByKey,
  SelectMany,
  SelectManyByKeys,
  SelectMore,
  SelectMoreByKeys,
  Update,
  UpdateFailure,
  UpdateMany,
  UpdateManyFailure,
  UpdateManySuccess,
  UpdateSuccess
} from './actions';

const xform = {
  fromServer: data => data,
  toServer: data => data
};

@Entity({
  modelName: 'TestEntity',
  transform: [xform]
})
class TestEntity {
  @Key id: number;
  firstName: string;
  lastName: string;
}

class AltEntity {
  @Key id: number;
  data: string;
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

const testError = {
  status: 500,
  error: {
    message: 'Test error'
  }
};

const criteria = { criteria: 'test' };

const regex = {
  v4: /^(?:[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})|(?:0{8}-0{4}-0{4}-0{4}-0{12})$/u,
  v5: /^(?:[a-f0-9]{8}-[a-f0-9]{4}-5[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})|(?:0{8}-0{4}-0{4}-0{4}-0{12})$/u
};

const isUuid = (value: string): boolean => {
  return regex.v4.test(value) || regex.v5.test(value);
};

describe('NgRX Auto-Entity: Actions', () => {
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
    });
  });

  describe('Correlated Actions', () => {
    it('should construct EntityAction with correlationId initialized to a random uuid', () => {
      const action = new Load(TestEntity, 1);

      expect(isUuid(action.correlationId)).toEqual(true);
    });
  });

  describe('Transformations', () => {
    it('should attach entity transformations to entity info', () => {
      const action = new Load(TestEntity, 1);

      expect(action.info.transform).toEqual([xform]);
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
    });

    describe('LoadSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadSuccess(TestEntity, jon);

        expect(action.type).toEqual('[TestEntity] (Generic) Load: Success');
        expect(action.actionType).toEqual(EntityActionTypes.LoadSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(jon);
      });
    });

    describe('LoadFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Load: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
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
        const action = new LoadManySuccess(TestEntity, [jon]);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.LoadManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual([jon]);
      });
    });

    describe('LoadManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadManyFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
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
        const action = new LoadAllSuccess(TestEntity, [jon]);

        expect(action.type).toEqual('[TestEntity] (Generic) Load All: Success');
        expect(action.actionType).toEqual(EntityActionTypes.LoadAllSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual([jon]);
      });
    });

    describe('LoadAllFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadAllFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Load All: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadAllFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
      });
    });
  });

  describe('Actions: LoadPage', () => {
    describe('LoadPage', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadPage(TestEntity, { page: 2, size: 10 });

        expect(action.type).toEqual('[TestEntity] (Generic) Load Page');
        expect(action.actionType).toEqual(EntityActionTypes.LoadPage);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.page).toEqual({ page: 2, size: 10 });
      });

      it('should construct EntityAction with proper details and criteria', () => {
        const action = new LoadPage(TestEntity, { page: 2, size: 10 }, criteria);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Page');
        expect(action.actionType).toEqual(EntityActionTypes.LoadPage);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.page).toEqual({ page: 2, size: 10 });
        expect(action.criteria).toEqual(criteria);
      });
    });

    describe('LoadPageSuccess', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadPageSuccess(TestEntity, developers, {
          page: { page: 1, size: 2 },
          totalCount: 10
        });

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
      });
    });

    describe('LoadPageFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadAllFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Load All: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadAllFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
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
        const action = new LoadRangeSuccess(TestEntity, developers, {
          range: {
            start: 1,
            end: 10
          },
          totalCount: 2
        });

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
      });
    });

    describe('LoadRangeFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new LoadRangeFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Load Range: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.LoadRangeFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
      });
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
        const action = new CreateSuccess(TestEntity, fyneman);

        expect(action.type).toEqual('[TestEntity] (Generic) Create: Success');
        expect(action.actionType).toEqual(EntityActionTypes.CreateSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
      });
    });

    describe('CreateFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new CreateFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Create: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.CreateFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
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
        const action = new CreateManySuccess(TestEntity, scientists);

        expect(action.type).toEqual('[TestEntity] (Generic) Create Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.CreateManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
      });
    });

    describe('CreateManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new CreateManyFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Create Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.CreateManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
      });
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
        const action = new UpdateSuccess(TestEntity, fyneman);

        expect(action.type).toEqual('[TestEntity] (Generic) Update: Success');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
      });
    });

    describe('UpdateFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpdateFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Update: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
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
        const action = new UpdateManySuccess(TestEntity, scientists);

        expect(action.type).toEqual('[TestEntity] (Generic) Update Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
      });
    });

    describe('UpdateManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new UpdateManyFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Update Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.UpdateManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
      });
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
        const action = new ReplaceSuccess(TestEntity, fyneman);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace: Success');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceSuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entity).toEqual(fyneman);
      });
    });

    describe('ReplaceFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new ReplaceFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
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
        const action = new ReplaceManySuccess(TestEntity, scientists);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace Many: Success');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceManySuccess);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.entities).toEqual(scientists);
      });
    });

    describe('ReplaceManyFailure', () => {
      it('should construct EntityAction with proper details', () => {
        const action = new ReplaceManyFailure(TestEntity, testError);

        expect(action.type).toEqual('[TestEntity] (Generic) Replace Many: Failure');
        expect(action.actionType).toEqual(EntityActionTypes.ReplaceManyFailure);
        expect(action.info.modelType).toEqual(TestEntity);
        expect(action.info.modelName).toEqual('TestEntity');

        expect(action.error).toEqual(testError);
      });
    });
  });

  describe('Action: Clear', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new Clear(TestEntity);

      expect(action.type).toEqual('[TestEntity] (Generic) Clear');
      expect(action.actionType).toEqual(EntityActionTypes.Clear);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
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
        // tslint:disable-next-line:no-unused-expression
        new DeselectMany(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! DeselectMany action requires an array of entities.'));
    });

    it('should throw error during construction if non-array (null) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new DeselectMany(TestEntity, null);
      }).toThrow(new Error('[NGRX-AE] ! DeselectMany action requires an array of entities.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
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
        // tslint:disable-next-line:no-unused-expression
        new DeselectManyByKeys(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! DeselectManyByKeys action requires an array of entity keys.'));
    });

    it('should throw error during construction if non-array (null) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new DeselectManyByKeys(TestEntity, null);
      }).toThrow(new Error('[NGRX-AE] ! DeselectManyByKeys action requires an array of entity keys.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
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

    it('should throw error during construction if non-array (object) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new DeselectedMany(TestEntity, {} as any);
      }).toThrow(new Error('[NGRX-AE] ! DeselectedMany action requires an array of entities or keys.'));
    });

    it('should throw error during construction if non-array (null) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new DeselectedMany(TestEntity, null);
      }).toThrow(new Error('[NGRX-AE] ! DeselectedMany action requires an array of entities or keys.'));
    });

    it('should throw error during construction if non-array (undefined) passed', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new DeselectedMany(TestEntity, undefined);
      }).toThrow(new Error('[NGRX-AE] ! DeselectedMany action requires an array of entities or keys.'));
    });
  });

  describe('Operator: ofActionType<T extends EntityAction>', () => {
    it('should match action type', () => {
      const action = new Load(TestEntity, 'id');

      actions = hot('-a', { a: action });
      const expected = hot('-a', { a: action });
      const result = actions.pipe(ofEntityAction(EntityActionTypes.Load));

      expect(result).toBeObservable(expected);
    });

    it('should match action type and ignore prior non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');

      actions = hot('-a-b', { a: action1, b: action2 });
      const expected = hot('---b', { b: action2 });
      const result = actions.pipe(ofEntityAction(EntityActionTypes.Load));

      expect(result).toBeObservable(expected);
    });

    it('should match action type and ignore subsequent non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');

      actions = hot('-a-b', { a: action2, b: action1 });
      const expected = hot('-a--', { a: action2 });
      const result = actions.pipe(ofEntityAction(EntityActionTypes.Load));

      expect(result).toBeObservable(expected);
    });

    it('should match action type and ignore orior and subsequent non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');
      const action3 = new LoadAll(TestEntity);

      actions = hot('-a-b-c', { a: action1, b: action2, c: action3 });
      const expected = hot('---b--', { b: action2 });
      const result = actions.pipe(ofEntityAction(EntityActionTypes.Load));

      expect(result).toBeObservable(expected);
    });

    it('should match multiple action types', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');
      const action3 = new LoadAll(TestEntity);

      actions = hot('-a-b-c', { a: action1, b: action2, c: action3 });
      const expected = hot('-a-b-c', { a: action1, b: action2, c: action3 });
      const result = actions.pipe(ofEntityAction(EntityActionTypes.Load, EntityActionTypes.LoadAll));

      expect(result).toBeObservable(expected);
    });

    it('should match multiple action types and ignore non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new LoadMany(TestEntity);
      const action3 = new Load(TestEntity, 'id');
      const action4 = new LoadAll(TestEntity);
      const action5 = new LoadMany(TestEntity);

      actions = hot('-a-b-c-d-e', { a: action1, b: action2, c: action3, d: action4, e: action5 });
      const expected = hot('-a---c-d--', { a: action1, c: action3, d: action4 });
      const result = actions.pipe(ofEntityAction(EntityActionTypes.Load, EntityActionTypes.LoadAll));

      expect(result).toBeObservable(expected);
    });

    it('should match no action types if none match', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new LoadMany(TestEntity);
      const action3 = new Load(TestEntity, 'id');
      const action4 = new LoadAll(TestEntity);
      const action5 = new LoadMany(TestEntity);

      actions = hot('-a-b-c-d-e', { a: action1, b: action2, c: action3, d: action4, e: action5 });
      const expected = hot('----------');
      const result = actions.pipe(ofEntityAction(EntityActionTypes.LoadPage));

      expect(result).toBeObservable(expected);
    });
  });

  describe('Operator: ofEntityType<TModel, T extends EntityAction>', () => {
    it('should match action type and entity type', () => {
      const action = new Load(TestEntity, 'id');

      actions = hot('-a', { a: action });
      const expected = hot('-a', { a: action });
      const result = actions.pipe(ofEntityType(TestEntity, EntityActionTypes.Load));

      expect(result).toBeObservable(expected);
    });

    it('should match action type and entity type and ignore prior non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');

      actions = hot('-a-b', { a: action1, b: action2 });
      const expected = hot('---b', { b: action2 });
      const result = actions.pipe(ofEntityType(TestEntity, EntityActionTypes.Load));

      expect(result).toBeObservable(expected);
    });

    it('should match action type and entity type and ignore subsequent non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');

      actions = hot('-a-b', { a: action2, b: action1 });
      const expected = hot('-a--', { a: action2 });
      const result = actions.pipe(ofEntityType(TestEntity, EntityActionTypes.Load));

      expect(result).toBeObservable(expected);
    });

    it('should match action type and entity type and ignore orior and subsequent non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');
      const action3 = new LoadAll(TestEntity);

      actions = hot('-a-b-c', { a: action1, b: action2, c: action3 });
      const expected = hot('---b--', { b: action2 });
      const result = actions.pipe(ofEntityType(TestEntity, EntityActionTypes.Load));

      expect(result).toBeObservable(expected);
    });

    it('should match multiple action types and entity type', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');
      const action3 = new LoadAll(TestEntity);

      actions = hot('-a-b-c', { a: action1, b: action2, c: action3 });
      const expected = hot('-a-b-c', { a: action1, b: action2, c: action3 });
      const result = actions.pipe(ofEntityType(TestEntity, EntityActionTypes.Load, EntityActionTypes.LoadAll));

      expect(result).toBeObservable(expected);
    });

    it('should match multiple action types and entity type and ignore non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new LoadMany(TestEntity);
      const action3 = new Load(TestEntity, 'id');
      const action4 = new LoadAll(TestEntity);
      const action5 = new LoadMany(TestEntity);

      actions = hot('-a-b-c-d-e', { a: action1, b: action2, c: action3, d: action4, e: action5 });
      const expected = hot('-a---c-d--', { a: action1, c: action3, d: action4 });
      const result = actions.pipe(ofEntityType(TestEntity, EntityActionTypes.Load, EntityActionTypes.LoadAll));

      expect(result).toBeObservable(expected);
    });

    it('should match no action types if none match for entity type', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new LoadMany(TestEntity);
      const action3 = new Load(TestEntity, 'id');
      const action4 = new LoadAll(TestEntity);
      const action5 = new LoadMany(TestEntity);

      actions = hot('-a-b-c-d-e', { a: action1, b: action2, c: action3, d: action4, e: action5 });
      const expected = hot('----------');
      const result = actions.pipe(ofEntityType(TestEntity, EntityActionTypes.LoadPage));

      expect(result).toBeObservable(expected);
    });
  });

  describe('Operator: fromEntityTypes<TModel, T extends EntityAction>', () => {
    it('should match action type and entity types', () => {
      const action1 = new Load(TestEntity, 'id');
      const action2 = new Load(AltEntity, 'id');

      actions = hot('-a-b', { a: action1, b: action2 });
      const expected = hot('-a-b', { a: action1, b: action2 });
      const result = fromEntityActions(actions, [TestEntity, AltEntity], EntityActionTypes.Load);

      expect(result).toBeObservable(expected);
    });

    it('should match action type and entity types and ignore prior non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');
      const action3 = new Load(AltEntity, 'id');

      actions = hot('-a-b-c', { a: action1, b: action2, c: action3 });
      const expected = hot('---b-c', { b: action2, c: action3 });
      const result = fromEntityActions(actions, [TestEntity, AltEntity], EntityActionTypes.Load);

      expect(result).toBeObservable(expected);
    });

    it('should match action type and entity types and ignore intermediate non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');
      const action3 = new Load(AltEntity, 'id');

      actions = hot('-a-b-c', { a: action2, b: action1, c: action3 });
      const expected = hot('-a---c-', { a: action2, c: action3 });
      const result = fromEntityActions(actions, [TestEntity, AltEntity], EntityActionTypes.Load);

      expect(result).toBeObservable(expected);
    });

    it('should match action type and entity types and ignore prior and subsequent non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');
      const action3 = new Load(AltEntity, 'id');
      const action4 = new LoadAll(TestEntity);

      actions = hot('-a-b-c-d', { a: action1, b: action2, c: action3, d: action4 });
      const expected = hot('---b-c--', { b: action2, c: action3 });
      const result = fromEntityActions(actions, [TestEntity, AltEntity], EntityActionTypes.Load);

      expect(result).toBeObservable(expected);
    });

    it('should match multiple action types and entity types', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new Load(TestEntity, 'id');
      const action3 = new Load(AltEntity, 'id');
      const action4 = new LoadAll(TestEntity);

      actions = hot('-a-b-c-d', { a: action1, b: action2, c: action3, d: action4 });
      const expected = hot('-a-b-c-d', { a: action1, b: action2, c: action3, d: action4 });
      const result = fromEntityActions(
        actions,
        [TestEntity, AltEntity],
        EntityActionTypes.Load,
        EntityActionTypes.LoadAll
      );

      expect(result).toBeObservable(expected);
    });

    it('should match multiple action types and entity types and ignore non-matching', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new LoadMany(TestEntity);
      const action3 = new Load(TestEntity, 'id');
      const action4 = new Load(AltEntity, 'id');
      const action5 = new LoadAll(TestEntity);
      const action6 = new LoadMany(TestEntity);

      actions = hot('-a-b-c-d-e-f', { a: action1, b: action2, c: action3, d: action4, e: action5, f: action6 });
      const expected = hot('-a---c-d-e--', { a: action1, c: action3, d: action4, e: action5 });
      const result = fromEntityActions(
        actions,
        [TestEntity, AltEntity],
        EntityActionTypes.Load,
        EntityActionTypes.LoadAll
      );

      expect(result).toBeObservable(expected);
    });

    it('should match no action types if none match for entity types', () => {
      const action1 = new LoadAll(TestEntity);
      const action2 = new LoadMany(TestEntity);
      const action3 = new Load(TestEntity, 'id');
      const action4 = new Load(AltEntity, 'id');
      const action5 = new LoadAll(TestEntity);
      const action6 = new LoadMany(TestEntity);

      actions = hot('-a-b-c-d-e-f', { a: action1, b: action2, c: action3, d: action4, e: action5, f: action6 });
      const expected = hot('------------');
      const result = fromEntityActions(actions, [TestEntity, AltEntity], EntityActionTypes.LoadPage);
      expect(result).toBeObservable(expected);
    });
  });
});
