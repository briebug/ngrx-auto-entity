import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { fromEntityActions, ofEntityAction, ofEntityType } from './action-operators';
import { EntityActionTypes } from './action-types';
import { Load } from './load-actions';
import { LoadAll } from './load-all-actions';
import { LoadMany } from './load-many-actions';

@Entity({
  modelName: 'TestEntity'
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

describe('NgRx Action Operators', () => {
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
    });
  });

  describe('Operator: ofEntityAction<T extends EntityAction>', () => {
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
      const result = fromEntityActions(actions, [TestEntity, AltEntity], EntityActionTypes.Load, EntityActionTypes.LoadAll);

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
      const result = fromEntityActions(actions, [TestEntity, AltEntity], EntityActionTypes.Load, EntityActionTypes.LoadAll);

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
