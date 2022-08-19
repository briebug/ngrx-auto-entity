import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { EntityActionTypes } from './action-types';
import { Clear } from './actions';
import { Load } from './load-actions';

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

const regex = {
  v4: /^(?:[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})|(?:0{8}-0{4}-0{4}-0{4}-0{12})$/u,
  v5: /^(?:[a-f0-9]{8}-[a-f0-9]{4}-5[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})|(?:0{8}-0{4}-0{4}-0{4}-0{12})$/u
};

const isUuid = (value: string): boolean => {
  return regex.v4.test(value) || regex.v5.test(value);
};

describe('NgRX Auto-Entity: Actions', () => {
  // eslint-disable-next-line prefer-const
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

  describe('Action: Clear', () => {
    it('should construct EntityAction with proper details', () => {
      const action = new Clear(TestEntity);

      expect(action.type).toEqual('[TestEntity] (Generic) Clear');
      expect(action.actionType).toEqual(EntityActionTypes.Clear);
      expect(action.info.modelType).toEqual(TestEntity);
      expect(action.info.modelName).toEqual('TestEntity');
    });
  });
});
