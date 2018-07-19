import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { EntityActionTypes, Load, ofEntityType } from './ngrx-auto-entity.actions';
import { Key } from './ngrx-auto-entity.decorators';

class TestEntity {
  @Key id: number;
  firstName: 'Brian';
  lastName: 'Love';
}

describe('NgrxAutoEntityActions', () => {
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions)]
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
