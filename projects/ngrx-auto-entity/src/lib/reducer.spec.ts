import 'jest-extended';

import {
  Clear,
  CreateManySuccess,
  CreateSuccess,
  DeleteByKeySuccess,
  DeleteManyByKeysSuccess,
  DeleteManySuccess,
  DeleteSuccess,
  Deselect,
  DeselectAll,
  DeselectMany,
  DeselectManyByKeys,
  Load,
  LoadAllSuccess,
  LoadManySuccess,
  LoadPageSuccess,
  LoadRangeSuccess,
  LoadSuccess,
  ReplaceManySuccess,
  ReplaceSuccess,
  Select,
  SelectByKey,
  SelectMany,
  SelectManyByKeys,
  SelectMore,
  SelectMoreByKeys,
  UpdateManySuccess,
  UpdateSuccess
} from './actions';
import { Key } from './decorators/key';
import { autoEntityMetaReducer, autoEntityReducer, stateNameFromAction } from './reducer';

class TestEntity {
  @Key identity: number;
  name?: string;
}

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
    // region Load
    it(`should reduce LoadSuccess and add entity to empty state`, () => {
      const state = {
        testEntity: {
          entities: {},
          ids: []
        }
      };
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new LoadSuccess(TestEntity, { identity: 1 }));

      expect(newState).toEqual({
        testEntity: {
          entities: { 1: { identity: 1 } },
          ids: [1],
          isLoading: false,
          loadedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new LoadSuccess(TestEntity, { identity: 2 }));

      expect(newState).toEqual({
        testEntity: {
          entities: {
            1: { identity: 1 },
            2: { identity: 2 }
          },
          ids: [1, 2],
          isLoading: false,
          loadedAt: expect.toBeDate()
        }
      });
    });
    // endregion

    // region LoadAll
    it(`should reduce LoadAllSuccess and add entities to empty state`, () => {
      const state = {
        testEntity: {
          entities: {},
          ids: []
        }
      };
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new LoadAllSuccess(TestEntity, [{ identity: 1 }, { identity: 2 }, { identity: 3 }])
      );

      expect(newState).toEqual({
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
          loadedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new LoadAllSuccess(TestEntity, [{ identity: 4 }, { identity: 5 }, { identity: 6 }])
      );

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
          loadedAt: expect.toBeDate()
        }
      });
    });
    // endregion

    // region LoadMany
    it(`should reduce LoadManySuccess and add entities to empty state`, () => {
      const state = {
        testEntity: {
          entities: {},
          ids: []
        }
      };
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new LoadAllSuccess(TestEntity, [{ identity: 1 }, { identity: 2 }, { identity: 3 }])
      );

      expect(newState).toEqual({
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
          loadedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new LoadManySuccess(TestEntity, [{ identity: 4 }, { identity: 5 }, { identity: 6 }])
      );

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
          loadedAt: expect.toBeDate()
        }
      });
    });
    // endregion

    // region LoadPage
    it(`should reduce LoadPageSuccess and add entities and page info to empty state`, () => {
      const state = {
        testEntity: {
          entities: {},
          ids: []
        }
      };
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new LoadPageSuccess(TestEntity, [{ identity: 1 }, { identity: 2 }, { identity: 3 }], {
          page: {
            page: 1,
            size: 3
          },
          totalCount: 10
        })
      );

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
          loadedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new LoadPageSuccess(TestEntity, [{ identity: 4 }, { identity: 5 }, { identity: 6 }], {
          page: {
            page: 2,
            size: 3
          },
          totalCount: 10
        })
      );

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
          loadedAt: expect.toBeDate()
        }
      });
    });
    // endregion

    // region LoadRange
    it(`should reduce LoadRangeSuccess and add entities and range info to empty state`, () => {
      const state = {
        testEntity: {
          entities: {},
          ids: []
        }
      };
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new LoadRangeSuccess(TestEntity, [{ identity: 1 }, { identity: 2 }, { identity: 3 }], {
          range: { first: 1, last: 3 },
          totalCount: 10
        })
      );

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
          loadedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new LoadRangeSuccess(TestEntity, [{ identity: 4 }, { identity: 5 }, { identity: 6 }], {
          range: { first: 4, last: 6 },
          totalCount: 10
        })
      );

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
          loadedAt: expect.toBeDate()
        }
      });
    });
    // endregion

    // region Create
    it(`should reduce CreateSuccess and add new entity to state`, () => {
      const state = {
        testEntity: {
          entities: { 1: { identity: 1 } },
          ids: [1]
        }
      };
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new CreateSuccess(TestEntity, { identity: 2 }));

      expect(newState).toEqual({
        testEntity: {
          entities: {
            1: { identity: 1 },
            2: { identity: 2 }
          },
          ids: [1, 2],
          isSaving: false,
          createdAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new CreateManySuccess(TestEntity, [{ identity: 1 }, { identity: 3 }]));

      expect(newState).toEqual({
        testEntity: {
          entities: {
            2: { identity: 2 },
            1: { identity: 1 },
            3: { identity: 3 }
          },
          ids: [2, 1, 3],
          isSaving: false,
          createdAt: expect.toBeDate()
        }
      });
    });
    // endregion

    // region Update
    it(`should reduce UpdateSuccess and update existing entity in state`, () => {
      const state = {
        testEntity: {
          entities: { 1: { identity: 1, name: 'before' } },
          ids: [1]
        }
      };
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new UpdateSuccess(TestEntity, { identity: 1, name: 'after' }));

      expect(newState).toEqual({
        testEntity: {
          entities: {
            1: { identity: 1, name: 'after' }
          },
          ids: [1],
          isSaving: false,
          savedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new UpdateManySuccess(TestEntity, [{ identity: 1, name: 'after1' }, { identity: 3, name: 'after3' }])
      );

      expect(newState).toEqual({
        testEntity: {
          entities: {
            1: { identity: 1, name: 'after1' },
            2: { identity: 2, name: 'before2' },
            3: { identity: 3, name: 'after3' }
          },
          ids: [1, 2, 3],
          isSaving: false,
          savedAt: expect.toBeDate()
        }
      });
    });
    // endregion

    // region Replace
    it(`should reduce ReplaceSuccess and update existing entity in state`, () => {
      const state = {
        testEntity: {
          entities: { 1: { identity: 1, name: 'before' } },
          ids: [1]
        }
      };
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new ReplaceSuccess(TestEntity, { identity: 1, name: 'after' }));

      expect(newState).toEqual({
        testEntity: {
          entities: {
            1: { identity: 1, name: 'after' }
          },
          ids: [1],
          isSaving: false,
          savedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(
        state,
        new ReplaceManySuccess(TestEntity, [{ identity: 1, name: 'after1' }, { identity: 3, name: 'after3' }])
      );

      expect(newState).toEqual({
        testEntity: {
          entities: {
            1: { identity: 1, name: 'after1' },
            2: { identity: 2, name: 'before2' },
            3: { identity: 3, name: 'after3' }
          },
          ids: [1, 2, 3],
          isSaving: false,
          savedAt: expect.toBeDate()
        }
      });
    });
    // endregion

    // region Delete
    it(`should reduce DeleteSuccess and remove existing entity from state`, () => {
      const state = {
        testEntity: {
          entities: { 1: { identity: 1 } },
          ids: [1]
        }
      };
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new DeleteSuccess(TestEntity, { identity: 1 }));

      expect(newState).toEqual({
        testEntity: {
          entities: {},
          ids: [],
          isDeleting: false,
          deletedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new DeleteManySuccess(TestEntity, [{ identity: 1 }, { identity: 3 }]));

      expect(newState).toEqual({
        testEntity: {
          entities: {
            2: { identity: 2 }
          },
          ids: [2],
          isDeleting: false,
          deletedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new DeleteByKeySuccess(TestEntity, 1));

      expect(newState).toEqual({
        testEntity: {
          entities: {},
          ids: [],
          isDeleting: false,
          deletedAt: expect.toBeDate()
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new DeleteManyByKeysSuccess(TestEntity, [1, 3]));

      expect(newState).toEqual({
        testEntity: {
          entities: {
            2: { identity: 2 }
          },
          ids: [2],
          isDeleting: false,
          deletedAt: expect.toBeDate()
        }
      });
    });
    // endregion

    // region Select (single)
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new Select(TestEntity, { identity: 1 }));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectByKey(TestEntity, 1));

      expect(newState.testEntity.currentEntityKey).toBe(1);
    });
    // endregion

    // region Deselect (single)
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new Deselect(TestEntity));

      expect(newState.testEntity.currentEntityKey).toBeUndefined();
    });
    // endregion

    // region Select (many)
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMany(TestEntity, [{ identity: 1 }, { identity: 3 }]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMany(TestEntity, [{ identity: 1 }, { identity: 3 }]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMany(TestEntity, []));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMany(TestEntity, []));

      expect(newState.testEntity.currentEntitiesKeys).toEqual([]);
    });

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMore(TestEntity, [{ identity: 1 }, { identity: 3 }]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMore(TestEntity, [{ identity: 1 }, { identity: 3 }]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMore(TestEntity, [{ identity: 1 }, { identity: 3 }]));

      expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
    });

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectManyByKeys(TestEntity, [1, 3]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectManyByKeys(TestEntity, [1, 3]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectManyByKeys(TestEntity, []));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectManyByKeys(TestEntity, []));

      expect(newState.testEntity.currentEntitiesKeys).toEqual([]);
    });

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMoreByKeys(TestEntity, [1, 3]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMoreByKeys(TestEntity, [1, 3]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new SelectMoreByKeys(TestEntity, [1, 3]));

      expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 3]);
    });
    // endregion

    // region Deselect (many)
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new DeselectMany(TestEntity, [{ identity: 1 }, { identity: 3 }]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new DeselectMany(TestEntity, []));

      expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 2, 3]);
    });

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new DeselectManyByKeys(TestEntity, [1, 3]));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new DeselectManyByKeys(TestEntity, []));

      expect(newState.testEntity.currentEntitiesKeys).toEqual([1, 2, 3]);
    });

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new DeselectAll(TestEntity));

      expect(newState.testEntity.currentEntitiesKeys).toBeUndefined();
    });
    // endregion

    // region Clear
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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new Clear(TestEntity));

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
      const rootReducer = jest.fn();
      const metaReducer = autoEntityMetaReducer(rootReducer);
      const newState = metaReducer(state, new Clear(TestEntity));

      expect(newState.testEntity).toEqual({
        entities: {},
        ids: [],
        customProperty: 'hello'
      });
    });
    // endregion
  });
});
