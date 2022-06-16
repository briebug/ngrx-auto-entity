import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { buildActionMap } from './action-map-builder';
import { makeEntity } from './make-entity';

@Entity({
  modelName: 'Test'
})
class Test {
  @Key id: number;
  name: string;
}

const makeTestModel = makeEntity(Test);

describe('buildActionMap()', () => {
  it('should return new ActionFactoryResolver implementing IActionMap for specified entity model type', () => {
    const resolver = buildActionMap(Test);
    expect(resolver).toBeDefined();
    expect(Object.getOwnPropertyNames(Object.getPrototypeOf(resolver))).toEqual([
      'constructor',

      'load',
      'loadIfNecessary',
      'loadSuccess',
      'loadFailure',
      'loadAll',
      'loadAllIfNecessary',
      'loadAllSuccess',
      'loadAllFailure',
      'loadMany',
      'loadManyIfNecessary',
      'loadManySuccess',
      'loadManyFailure',
      'loadPage',
      'loadPageIfNecessary',
      'loadPageSuccess',
      'loadPageFailure',
      'loadRange',
      'loadRangeIfNecessary',
      'loadRangeSuccess',
      'loadRangeFailure',
      'create',
      'createSuccess',
      'createFailure',
      'createMany',
      'createManySuccess',
      'createManyFailure',
      'update',
      'updateSuccess',
      'updateFailure',
      'updateMany',
      'updateManySuccess',
      'updateManyFailure',
      'upsert',
      'upsertSuccess',
      'upsertFailure',
      'upsertMany',
      'upsertManySuccess',
      'upsertManyFailure',
      'replace',
      'replaceSuccess',
      'replaceFailure',
      'replaceMany',
      'replaceManySuccess',
      'replaceManyFailure',
      'clear',
      'delete',
      'deleteSuccess',
      'deleteFailure',
      'deleteMany',
      'deleteManySuccess',
      'deleteManyFailure',
      'deleteByKey',
      'deleteByKeySuccess',
      'deleteByKeyFailure',
      'deleteManyByKeys',
      'deleteManyByKeysSuccess',
      'deleteManyByKeysFailure',
      'deselect',
      'deselectMany',
      'deselectManyByKeys',
      'deselectAll',
      'deselected',
      'deselectedMany',
      'select',
      'selectByKey',
      'selectMany',
      'selectMore',
      'selectManyByKeys',
      'selectMoreByKeys',
      'selected',
      'selectedMany',
      'selectedMore',
      'editNew',
      'edit',
      'editByKey',
      'edited',
      'editedByKey',
      'change',
      'changed',
      'endEdit',
      'editEnded'
    ]);
  });
});
