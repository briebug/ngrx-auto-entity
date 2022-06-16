import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { IEntityDictionary, IEntityState } from '../util/entity-state';
import { makeEntity } from '../util/make-entity';
import { mapToEdits, mapToEntities, mapToIds, mapToPaging, mapToSelections, mapToTracking } from './root.selectors';

@Entity({
  modelName: 'Test',
  comparer: (a, b) => a.id - b.id,
  comparers: {
    test: (a, b) => a.name.localeCompare(b.name)
  }
})
class Test {
  @Key id: number;
  name: string;
}

const makeTestModel = makeEntity(Test);

describe('mapToEntities', () => {
  it('should return empty object if no state', () => {
    const root = mapToEntities(undefined);
    expect(root).toEqual({});
  });

  it('should return empty object if state but no root', () => {
    const root = mapToEntities({} as IEntityState<unknown>);
    expect(root).toEqual({});
  });

  it('should return entities state root', () => {
    const root = mapToEntities({ entities: { 1: {} } as IEntityDictionary<unknown> } as IEntityState<unknown>);
    expect(root).toEqual({ 1: {} });
  });
});

describe('mapToIds', () => {
  it('should return empty array if no state', () => {
    const root = mapToIds(undefined);
    expect(root).toEqual([]);
  });

  it('should return empty object if state but no root', () => {
    const root = mapToIds({} as IEntityState<unknown>);
    expect(root).toEqual([]);
  });

  it('should return ids state root', () => {
    const root = mapToIds({ ids: [1] } as IEntityState<unknown>);
    expect(root).toEqual([1]);
  });
});

describe('mapToSelections', () => {
  it('should return undefined if no state', () => {
    const root = mapToSelections(undefined);
    expect(root).toBeUndefined();
  });

  it('should return undefined if state but no root', () => {
    const root = mapToSelections({} as IEntityState<unknown>);
    expect(root).toBeUndefined();
  });

  it('should return selections state root', () => {
    const root = mapToSelections({
      selections: {
        currentEntityKey: 1,
        currentEntitiesKeys: [2, 3, 5, 7, 11, 13]
      }
    } as IEntityState<unknown>);
    expect(root).toEqual({
      currentEntityKey: 1,
      currentEntitiesKeys: [2, 3, 5, 7, 11, 13]
    });
  });
});

describe('mapToEdits', () => {
  it('should return undefined if no state', () => {
    const root = mapToEdits(undefined);
    expect(root).toBeUndefined();
  });

  it('should return undefined if state but no root', () => {
    const root = mapToEdits({} as IEntityState<unknown>);
    expect(root).toBeUndefined();
  });

  it('should return edits state root', () => {
    const root = mapToEdits({
      edits: {
        isDirty: true,
        editedEntity: makeTestModel({ id: 123, name: 'OneTwoThree' })
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isDirty: true,
      editedEntity: makeTestModel({ id: 123, name: 'OneTwoThree' })
    });
  });
});

describe('mapToPaging', () => {
  it('should return undefined if no state', () => {
    const root = mapToPaging(undefined);
    expect(root).toBeUndefined();
  });

  it('should return undefined if state but no root', () => {
    const root = mapToPaging({} as IEntityState<unknown>);
    expect(root).toBeUndefined();
  });

  it('should return paging state root', () => {
    const root = mapToPaging({
      paging: {
        totalPageableCount: 1237,
        currentPage: {
          page: 2,
          size: 10
        }
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      totalPageableCount: 1237,
      currentPage: {
        page: 2,
        size: 10
      }
    });
  });
});

describe('mapToTracking', () => {
  it('should return undefined if no state', () => {
    const root = mapToTracking(undefined);
    expect(root).toBeUndefined();
  });

  it('should return undefined if state but no root', () => {
    const root = mapToTracking({} as IEntityState<unknown>);
    expect(root).toBeUndefined();
  });

  it('should return tracking state with loading true', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: true
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: true
    });
  });

  it('should return tracking state with loading false', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: true
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: true
    });
  });

  it('should return tracking state with loading false and loadedAt', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        loadedAt: Date.now()
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      loadedAt: expect.any(Number)
    });
  });

  it('should return tracking state with saving true', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        isSaving: true
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      isSaving: true
    });
  });

  it('should return tracking state with saving false', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        isSaving: false
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      isSaving: false
    });
  });

  it('should return tracking state with saving false and savedAt', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        loadedAt: Date.now(),
        isSaving: false,
        savedAt: Date.now()
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      loadedAt: expect.any(Number),
      isSaving: false,
      savedAt: expect.any(Number)
    });
  });

  it('should return tracking state with saving false and createdAt', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        loadedAt: Date.now(),
        isSaving: false,
        savedAt: Date.now(),
        createdAt: Date.now()
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      loadedAt: expect.any(Number),
      isSaving: false,
      savedAt: expect.any(Number),
      createdAt: expect.any(Number)
    });
  });

  it('should return tracking state with saving false and updatedAt', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        loadedAt: Date.now(),
        isSaving: false,
        savedAt: Date.now(),
        updatedAt: Date.now()
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      loadedAt: expect.any(Number),
      isSaving: false,
      savedAt: expect.any(Number),
      updatedAt: expect.any(Number)
    });
  });

  it('should return tracking state with saving false and replacedAt', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        loadedAt: Date.now(),
        isSaving: false,
        savedAt: Date.now(),
        replacedAt: Date.now()
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      loadedAt: expect.any(Number),
      isSaving: false,
      savedAt: expect.any(Number),
      replacedAt: expect.any(Number)
    });
  });

  it('should return tracking state with deleting true', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        isDeleting: true
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      isDeleting: true
    });
  });

  it('should return tracking state with deleting false', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        isDeleting: false
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      isDeleting: false
    });
  });

  it('should return tracking state with deleting false and deletedAt', () => {
    const root = mapToTracking({
      tracking: {
        isLoading: false,
        loadedAt: Date.now(),
        isDeleting: false,
        deletedAt: Date.now()
      }
    } as IEntityState<Test>);
    expect(root).toEqual({
      isLoading: false,
      loadedAt: expect.any(Number),
      isDeleting: false,
      deletedAt: expect.any(Number)
    });
  });
});
