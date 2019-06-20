import 'jest-extended';

import {
  CreateManySuccess,
  CreateSuccess,
  DeleteManySuccess,
  DeleteSuccess,
  Load,
  LoadAllSuccess,
  LoadManySuccess,
  LoadPageSuccess,
  LoadRangeSuccess,
  LoadSuccess,
  ReplaceManySuccess,
  ReplaceSuccess,
  UpdateManySuccess,
  UpdateSuccess
} from './actions';
import { Key } from './decorators';
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
  });
});
