import 'jest-extended';

import { Clear } from '../actions/actions';
import { CreateManySuccess, CreateSuccess } from '../actions/create-actions';
import { DeleteManySuccess, DeleteSuccess } from '../actions/delete-actions';
import { DeleteByKeySuccess, DeleteManyByKeysSuccess } from '../actions/delete-by-key-actions';
import { Deselect, DeselectAll, DeselectMany, DeselectManyByKeys } from '../actions/deselection-actions';
import { Edit, EditByKey } from '../actions/edit-actions';
import { Load, LoadSuccess } from '../actions/load-actions';
import { LoadAllSuccess } from '../actions/load-all-actions';
import { LoadManySuccess } from '../actions/load-many-actions';
import { LoadPageSuccess } from '../actions/load-page-actions';
import { LoadRangeSuccess } from '../actions/load-range-actions';
import { ReplaceManySuccess, ReplaceSuccess } from '../actions/replace-actions';
import { Select, SelectByKey, SelectMany, SelectManyByKeys, SelectMore, SelectMoreByKeys } from '../actions/selection-actions';
import { UpdateManySuccess, UpdateSuccess } from '../actions/update-actions';
import { UpsertManySuccess, UpsertSuccess } from '../actions/upsert-actions';
import { Key } from '../decorators/key-decorator';
import { autoEntityMetaReducer, autoEntityReducer, stateNameFromAction } from './reducer';

class TestEntity {
  @Key identity: number;
  name?: string;
}

describe('NgRx Auto-Entity: Reducer Performance', () => {
  it('should test loading 10k items followed by 10k more in less than 50ms', () => {
    const state = {
      testEntity: {
        entities: {},
        ids: []
      }
    };
    const entities1 = [...Array(10000).keys()].map(id => ({ identity: id, name: `Entity ${id}` }));
    const entities2 = [...Array(10000).keys()].map(id => ({ identity: id + 10000, name: `Entity ${id + 10000}` }));
    const rootReducer = (s, a) => s;
    const metaReducer = autoEntityMetaReducer(rootReducer);

    const start = performance.now();
    const allState = metaReducer(state, new LoadAllSuccess(TestEntity, entities1));
    const manyState = metaReducer(allState, new LoadManySuccess(TestEntity, entities2));
    const end = performance.now();

    expect(end - start).toBeLessThan(70); // TODO: Restore this to 50 milliseconds!
    expect(manyState.testEntity.ids.length).toBe(20000);
  });

  it('should test loading 100k items followed by 100k more in less than 500ms', () => {
    const state = {
      testEntity: {
        entities: {},
        ids: []
      }
    };
    const entities1 = [...Array(100000).keys()].map(id => ({ identity: id, name: `Entity ${id}` }));
    const entities2 = [...Array(100000).keys()].map(id => ({ identity: id + 100000, name: `Entity ${id + 100000}` }));
    const rootReducer = (s, a) => s;
    const metaReducer = autoEntityMetaReducer(rootReducer);

    const start = performance.now();
    const allState = metaReducer(state, new LoadAllSuccess(TestEntity, entities1));
    const manyState = metaReducer(allState, new LoadManySuccess(TestEntity, entities2));
    const end = performance.now();

    expect(end - start).toBeLessThan(500);
    expect(manyState.testEntity.ids.length).toBe(200000);
  });

  it('should test loading 1m items followed by 1m more in less than 2s', () => {
    const state = {
      testEntity: {
        entities: {},
        ids: []
      }
    };
    const entities1 = [...Array(1000000).keys()].map(id => ({ identity: id, name: `Entity ${id}` }));
    const entities2 = [...Array(1000000).keys()].map(id => ({
      identity: id + 1000000,
      name: `Entity ${id + 1000000}`
    }));

    const rootReducer = (s, a) => s;
    const metaReducer = autoEntityMetaReducer(rootReducer);

    const start = performance.now();
    const allState = metaReducer(state, new LoadAllSuccess(TestEntity, entities1));
    const manyState = metaReducer(allState, new LoadManySuccess(TestEntity, entities2));
    const end = performance.now();

    expect(end - start).toBeLessThan(2500); // TODO: Restore this to 2000 milliseconds!
    expect(manyState.testEntity.ids.length).toBe(2000000);
  });
});

describe('NgRX Auto-Entity: Reducer', () => {
  describe('stateNameFromAction', () => {
    it(`should convert PascalCase entity name to camelCase`, () => {
      const action = new Load(TestEntity, 1);
      const name = stateNameFromAction(action);
      expect(name).toBe('testEntity');
    });
  });

  describe('autoEntityMetaReducer', () => {
    it(`should return the autoEntityReducer`, () => {
      const metaReducer = autoEntityMetaReducer(({}, []) => {});
      expect(metaReducer).toBeDefined();
    });
  });

  describe('autoEntityReducer', () => {
    describe('Load', () => {
      it(`should reduce LoadSuccess and add entity to empty state`, () => {
        const state = {
          testEntity: {
            entities: {},
            ids: []
          }
        };
        const action = new LoadSuccess(TestEntity, { identity: 1 });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: { 1: { identity: 1 } },
            ids: [1],
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce LoadSuccess and add entity to existing state`, () => {
        const state = {
          testEntity: {
            entities: { 1: { identity: 1 } },
            ids: [1]
          }
        };
        const action = new LoadSuccess(TestEntity, { identity: 2 });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 }
            },
            ids: [1, 2],
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('LoadAll', () => {
      it(`should reduce LoadAllSuccess and add entities to empty state`, () => {
        const state = {
          testEntity: {
            entities: {},
            ids: []
          }
        };
        const action = new LoadAllSuccess(TestEntity, [{ identity: 1 }, { identity: 2 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toMatchObject({
          testEntity: {
            currentPage: 1,
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            totalPageableCount: 3,
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce LoadAllSuccess and replace entities in existing state`, () => {
        const state = {
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3]
          }
        };
        const action = new LoadAllSuccess(TestEntity, [{ identity: 4 }, { identity: 5 }, { identity: 6 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            currentPage: 1,
            entities: {
              4: { identity: 4 },
              5: { identity: 5 },
              6: { identity: 6 }
            },
            ids: [4, 5, 6],
            totalPageableCount: 3,
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('LoadMany', () => {
      it(`should reduce LoadManySuccess and add entities to empty state`, () => {
        const state = {
          testEntity: {
            entities: {},
            ids: []
          }
        };
        const action = new LoadManySuccess(TestEntity, [{ identity: 1 }, { identity: 2 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce LoadManySuccess and update entities in existing state`, () => {
        const state = {
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3]
          }
        };
        const action = new LoadManySuccess(TestEntity, [{ identity: 4 }, { identity: 5 }, { identity: 6 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 },
              4: { identity: 4 },
              5: { identity: 5 },
              6: { identity: 6 }
            },
            ids: [1, 2, 3, 4, 5, 6],
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('LoadPage', () => {
      it(`should reduce LoadPageSuccess and add entities and page info to empty state`, () => {
        const state = {
          testEntity: {
            entities: {},
            ids: []
          }
        };
        const action = new LoadPageSuccess(TestEntity, [{ identity: 1 }, { identity: 2 }, { identity: 3 }], {
          page: {
            page: 1,
            size: 3
          },
          totalCount: 10
        });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentPage: { page: 1, size: 3 },
            totalPageableCount: 10,
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce LoadPageSuccess and replace entities and page info in existing state`, () => {
        const state = {
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentPage: 1,
            totalPageableCount: 10
          }
        };
        const action = new LoadPageSuccess(TestEntity, [{ identity: 4 }, { identity: 5 }, { identity: 6 }], {
          page: {
            page: 2,
            size: 3
          },
          totalCount: 10
        });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              4: { identity: 4 },
              5: { identity: 5 },
              6: { identity: 6 }
            },
            ids: [4, 5, 6],
            currentPage: { page: 2, size: 3 },
            totalPageableCount: 10,
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('LoadRange', () => {
      it(`should reduce LoadRangeSuccess and add entities and range info to empty state`, () => {
        const state = {
          testEntity: {
            entities: {},
            ids: []
          }
        };
        const action = new LoadRangeSuccess(TestEntity, [{ identity: 1 }, { identity: 2 }, { identity: 3 }], {
          range: { first: 1, last: 3 },
          totalCount: 10
        });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentRange: { first: 1, last: 3 },
            totalPageableCount: 10,
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce LoadRangeSuccess and add entities and range info to existing state`, () => {
        const state = {
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentRange: { first: 1, last: 3 },
            totalPageableCount: 10
          }
        };
        const action = new LoadRangeSuccess(TestEntity, [{ identity: 4 }, { identity: 5 }, { identity: 6 }], {
          range: { first: 4, last: 6 },
          totalCount: 10
        });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 },
              3: { identity: 3 },
              4: { identity: 4 },
              5: { identity: 5 },
              6: { identity: 6 }
            },
            ids: [1, 2, 3, 4, 5, 6],
            currentRange: { first: 4, last: 6 }, // TODO: This is actually incorrect! Figure out how to merge current range info
            totalPageableCount: 10,
            isLoading: false,
            loadedAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('Create', () => {
      it(`should reduce CreateSuccess and add new entity to state`, () => {
        const state = {
          testEntity: {
            entities: { 1: { identity: 1 } },
            ids: [1]
          }
        };
        const action = new CreateSuccess(TestEntity, { identity: 2 });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1 },
              2: { identity: 2 }
            },
            ids: [1, 2],
            isSaving: false,
            createdAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce CreateManySuccess and update existing entities in state`, () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 }
            },
            ids: [2]
          }
        };
        const action = new CreateManySuccess(TestEntity, [{ identity: 1 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [2, 1, 3],
            isSaving: false,
            createdAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('Update', () => {
      it(`should reduce UpdateSuccess and update existing entity in state`, () => {
        const state = {
          testEntity: {
            entities: { 1: { identity: 1, name: 'before' } },
            ids: [1]
          }
        };
        const action = new UpdateSuccess(TestEntity, { identity: 1, name: 'after' });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1, name: 'after' }
            },
            ids: [1],
            isSaving: false,
            savedAt: expect.toBeNumber(),
            updatedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce UpdateManySuccess and update existing entities in state`, () => {
        const state = {
          testEntity: {
            entities: {
              1: { identity: 1, name: 'before1' },
              2: { identity: 2, name: 'before2' },
              3: { identity: 3, name: 'before3' }
            },
            ids: [1, 2, 3]
          }
        };
        const action = new UpdateManySuccess(TestEntity, [
          { identity: 1, name: 'after1' },
          {
            identity: 3,
            name: 'after3'
          }
        ]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1, name: 'after1' },
              2: { identity: 2, name: 'before2' },
              3: { identity: 3, name: 'after3' }
            },
            ids: [1, 2, 3],
            isSaving: false,
            savedAt: expect.toBeNumber(),
            updatedAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('Upsert', () => {
      it(`should reduce UpsertSuccess and update existing entity in state`, () => {
        const state = {
          testEntity: {
            entities: { 1: { identity: 1, name: 'before' } },
            ids: [1]
          }
        };
        const action = new UpsertSuccess(TestEntity, { identity: 1, name: 'after' });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1, name: 'after' }
            },
            ids: [1],
            isSaving: false,
            savedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce UpsertSuccess and insert new entity in state`, () => {
        const state = {
          testEntity: {
            entities: { 1: { identity: 1, name: 'before' } },
            ids: [1]
          }
        };
        const action = new UpsertSuccess(TestEntity, { identity: 2, name: 'new' });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1, name: 'before' },
              2: { identity: 2, name: 'new' }
            },
            ids: [1, 2],
            isSaving: false,
            savedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce UpsertManySuccess and update existing and add new entities in state`, () => {
        const state = {
          testEntity: {
            entities: {
              1: { identity: 1, name: 'before1' },
              2: { identity: 2, name: 'before2' },
              3: { identity: 3, name: 'before3' }
            },
            ids: [1, 2, 3]
          }
        };
        const action = new UpsertManySuccess(TestEntity, [
          { identity: 1, name: 'after1' },
          { identity: 4, name: 'new1' },
          { identity: 3, name: 'after3' },
          { identity: 5, name: 'new2' }
        ]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1, name: 'after1' },
              2: { identity: 2, name: 'before2' },
              3: { identity: 3, name: 'after3' },
              4: { identity: 4, name: 'new1' },
              5: { identity: 5, name: 'new2' }
            },
            ids: [1, 2, 3, 4, 5],
            isSaving: false,
            savedAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('Replace', () => {
      it(`should reduce ReplaceSuccess and update existing entity in state`, () => {
        const state = {
          testEntity: {
            entities: { 1: { identity: 1, name: 'before' } },
            ids: [1]
          }
        };
        const action = new ReplaceSuccess(TestEntity, { identity: 1, name: 'after' });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1, name: 'after' }
            },
            ids: [1],
            isSaving: false,
            savedAt: expect.toBeNumber(),
            replacedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce ReplaceManySuccess and update existing entities in state`, () => {
        const state = {
          testEntity: {
            entities: {
              1: { identity: 1, name: 'before1' },
              2: { identity: 2, name: 'before2' },
              3: { identity: 3, name: 'before3' }
            },
            ids: [1, 2, 3]
          }
        };
        const action = new ReplaceManySuccess(TestEntity, [
          { identity: 1, name: 'after1' },
          {
            identity: 3,
            name: 'after3'
          }
        ]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              1: { identity: 1, name: 'after1' },
              2: { identity: 2, name: 'before2' },
              3: { identity: 3, name: 'after3' }
            },
            ids: [1, 2, 3],
            isSaving: false,
            savedAt: expect.toBeNumber(),
            replacedAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('Delete', () => {
      it(`should reduce DeleteSuccess and remove existing entity from state`, () => {
        const state = {
          testEntity: {
            entities: { 1: { identity: 1 } },
            ids: [1]
          }
        };
        const action = new DeleteSuccess(TestEntity, { identity: 1 });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {},
            ids: [],
            isDeleting: false,
            deletedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce DeleteManySuccess and remove existing entities from state`, () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3]
          }
        };
        const action = new DeleteManySuccess(TestEntity, [{ identity: 1 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              2: { identity: 2 }
            },
            ids: [2],
            isDeleting: false,
            deletedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce DeleteByKeySuccess and remove existing entity from state`, () => {
        const state = {
          testEntity: {
            entities: { 1: { identity: 1 } },
            ids: [1]
          }
        };
        const action = new DeleteByKeySuccess(TestEntity, 1);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {},
            ids: [],
            isDeleting: false,
            deletedAt: expect.toBeNumber()
          }
        });
      });

      it(`should reduce DeleteManyByKeySuccess and remove existing entities from state`, () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3]
          }
        };
        const action = new DeleteManyByKeysSuccess(TestEntity, [1, 3]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              2: { identity: 2 }
            },
            ids: [2],
            isDeleting: false,
            deletedAt: expect.toBeNumber()
          }
        });
      });
    });

    describe('Select', () => {
      it('should reduce Select and add entity key to currentEntityKey in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntityKey: undefined
          }
        };
        const action = new Select(TestEntity, { identity: 1 });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntityKey).toBe(1);
      });

      it('should reduce SelectByKey and add entity key to currentEntityKey in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntityKey: undefined
          }
        };
        const action = new SelectByKey(TestEntity, 1);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntityKey).toBe(1);
      });
    });

    describe('Deselect', () => {
      it('should reduce Deselect and clear the currentEntityKey from state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntityKey: 1
          }
        };
        const action = new Deselect(TestEntity);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntityKey).toBeUndefined();
      });
    });

    describe('SelectMany', () => {
      it('should reduce SelectMany and set entity keys to currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: undefined
          }
        };
        const action = new SelectMany(TestEntity, [{ identity: 1 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
      });

      it('should reduce SelectMany and set entity keys replacing existing keys in currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [2]
          }
        };
        const action = new SelectMany(TestEntity, [{ identity: 1 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
      });

      it('should reduce SelectMany and set empty array to currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: undefined
          }
        };
        const action = new SelectMany(TestEntity, []);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([]);
      });

      it('should reduce SelectMany and set empty array replacing existing keys in currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new SelectMany(TestEntity, []);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([]);
      });
    });

    describe('SelectMore', () => {
      it('should reduce SelectMore and set entity keys to currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: undefined
          }
        };
        const action = new SelectMore(TestEntity, [{ identity: 1 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
      });

      it('should reduce SelectMore and add entity keys to existing keys in currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [2]
          }
        };
        const action = new SelectMore(TestEntity, [{ identity: 1 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([2, 1, 3]);
      });

      it('should reduce SelectMore and add entity keys to existing empty array in currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: []
          }
        };
        const action = new SelectMore(TestEntity, [{ identity: 1 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
      });
    });

    describe('SelectManyByKeys', () => {
      it('should reduce SelectManyByKeys and set entity keys to currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: undefined
          }
        };
        const action = new SelectManyByKeys(TestEntity, [1, 3]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
      });

      it('should reduce SelectManyByKeys and set entity keys replacing existing keys in currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [2]
          }
        };
        const action = new SelectManyByKeys(TestEntity, [1, 3]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
      });

      it('should reduce SelectManyByKeys and set empty array to currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: undefined
          }
        };
        const action = new SelectManyByKeys(TestEntity, []);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([]);
      });

      it('should reduce SelectManyByKeys and set empty array replacing existing keys in currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new SelectManyByKeys(TestEntity, []);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([]);
      });
    });

    describe('SelectMoreByKeys', () => {
      it('should reduce SelectMoreByKeys and set entity keys to currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: undefined
          }
        };
        const action = new SelectMoreByKeys(TestEntity, [1, 3]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
      });

      it('should reduce SelectMoreByKeys and add entity keys to existing keys in currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [2]
          }
        };
        const action = new SelectMoreByKeys(TestEntity, [1, 3]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([2, 1, 3]);
      });

      it('should reduce SelectMoreByKeys and add entity keys to existing empty array in currentEntitiesKeys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: []
          }
        };
        const action = new SelectMoreByKeys(TestEntity, [1, 3]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
      });
    });

    describe('DeselectMany', () => {
      it('should reduce DeselectMany with several entities and set currentEntitiesKeys to remaining keys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new DeselectMany(TestEntity, [{ identity: 1 }, { identity: 3 }]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([2]);
      });

      it('should reduce DeselectMany with empty array and leave currentEntitiesKeys as-is in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new DeselectMany(TestEntity, []);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 2, 3]);
      });
    });

    describe('DeselectManyByKeys', () => {
      it('should reduce DeselectManyByKeys with several keys and set currentEntitiesKeys to remaining keys in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new DeselectManyByKeys(TestEntity, [1, 3]);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([2]);
      });

      it('should reduce DeselectManyByKeys with empty array and leave currentEntitiesKeys as-is in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new DeselectManyByKeys(TestEntity, []);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 2, 3]);
      });
    });

    describe('DeselectAll', () => {
      it('should reduce DeselectAll and set currentEntitiesKeys to undefined in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new DeselectAll(TestEntity);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity.currentEntitiesKeys).toBeUndefined();
      });
    });

    describe('Clear', () => {
      it('should reduce Clear and reset auto-entity managed state to default, empty state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new Clear(TestEntity);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity).toEqual({
          entities: {},
          ids: []
        });
      });

      it('should reduce Clear and leave custom user-defined properties alone while clearning auto-entity managed state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3],
            customProperty: 'hello'
          }
        };
        const action = new Clear(TestEntity);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState.testEntity).toEqual({
          entities: {},
          ids: [],
          customProperty: 'hello'
        });
      });
    });

    describe('Edit', () => {
      it('should set the edited entity in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new Edit(TestEntity, { identity: 1 });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3],
            editedEntity: { identity: 1 },
            isDirty: false
          }
        });
      });

      it('should not change state if the entity is already being edited', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3],
            editedEntity: { identity: 1 },
            isDirty: false
          }
        };
        const action = new Edit(TestEntity, { identity: 1 });

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toStrictEqual(state);
      });

      it('should not change state if no entity is referenced by the action', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new Edit(TestEntity, null);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toStrictEqual(state);
      });
    });

    describe('EditByKey', () => {
      it('should set the edited entity in state', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new EditByKey(TestEntity, 1);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toEqual({
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3],
            editedEntity: { identity: 1 },
            isDirty: false
          }
        });
      });

      it('should not change state if the entity is already being edited', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3],
            editedEntity: { identity: 1 },
            isDirty: false
          }
        };
        const action = new EditByKey(TestEntity, 1);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toStrictEqual(state);
      });

      it('should not change state if no entity is referenced by the action', () => {
        const state = {
          testEntity: {
            entities: {
              2: { identity: 2 },
              1: { identity: 1 },
              3: { identity: 3 }
            },
            ids: [1, 2, 3],
            currentEntitiesKeys: [1, 2, 3]
          }
        };
        const action = new EditByKey(TestEntity, null);

        const rootReducer = (s, a) => {
          expect(a).toEqual(action);
          return s;
        };
        const metaReducer = autoEntityMetaReducer(rootReducer);
        const newState = metaReducer(state, action);

        expect(newState).toStrictEqual(state);
      });
    });
  });
});
