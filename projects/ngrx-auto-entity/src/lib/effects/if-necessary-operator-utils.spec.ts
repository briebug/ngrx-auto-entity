import { setInfo } from '../actions/util';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { FEATURE_AFFINITY } from '../util/util-tokens';
import {
  addSeconds,
  getCurrentPage,
  getCurrentRange,
  getEntityIds,
  getEntityState,
  getIsLoading,
  getLoadedAt,
  mapToHasEntities,
  nowAfterExpiry,
  warnIfMissingStore
} from './if-necessary-operator-utils';

@Entity('myEntity')
class MyEntity {
  @Key id: string;
}

@Entity('myFeatureEntity')
class MyFeatureEntity {
  @Key id: string;
}

MyFeatureEntity[FEATURE_AFFINITY] = 'feature';

describe('getEntityState()', () => {
  const entityState = {
    entities: {
      abc: {
        id: 'abc'
      }
    },
    ids: ['abc']
  };

  const featureEntityState = {
    entities: {
      xyz: {
        id: 'xyz'
      }
    },
    ids: ['xyz']
  };
  const state = {
    myEntity: entityState,
    feature: {
      myFeatureEntity: featureEntityState
    }
  };

  test('should return rooted entity state if entity type has no feature affinity', () => {
    const info = setInfo(MyEntity);
    const result = getEntityState(info)(state);

    expect(result).toEqual(entityState);
  });

  test('should return feature entity state if entity type has feature affinity', () => {
    const info = setInfo(MyFeatureEntity);
    const result = getEntityState(info)(state);

    expect(result).toEqual(featureEntityState);
  });
});

describe('getLoadedAt()', () => {
  test('should return undefined for entity state when not loaded', () => {
    const state = {
      myEntity: {
        entities: {},
        ids: []
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const loadedAt = getLoadedAt(entityState);
    expect(loadedAt).toBeUndefined();
  });

  test('should return timestamp for entity state when loaded', () => {
    const now = Date.now();
    const state = {
      myEntity: {
        entities: {
          abc: {
            id: 'abc'
          }
        },
        ids: ['abc'],
        loadedAt: now
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const loadedAt = getLoadedAt(entityState);
    expect(loadedAt).toBe(now);
  });
});

describe('getIsLoading()', () => {
  test('should return false for entity state when not loading', () => {
    const state = {
      myEntity: {
        entities: {},
        ids: []
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const isLoading = getIsLoading(entityState);
    expect(isLoading).toBeFalse();
  });

  test('should return true for entity state when loading', () => {
    const state = {
      myEntity: {
        entities: {},
        ids: [],
        isLoading: true
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const isLoading = getIsLoading(entityState);
    expect(isLoading).toBeTrue();
  });
});

describe('getCurrentPage()', () => {
  test('should return undefined for entity state that is not paged', () => {
    const state = {
      myEntity: {
        entities: {},
        ids: []
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const page = getCurrentPage(entityState);
    expect(page).toBeUndefined();
  });

  test('should return page object for entity state that is paged', () => {
    const state = {
      myEntity: {
        entities: {},
        ids: [],
        currentPage: {
          page: 2,
          size: 10
        }
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const page = getCurrentPage(entityState);
    expect(page).toEqual({
      page: 2,
      size: 10
    });
  });
});

describe('getCurrentRange()', () => {
  test('should return undefined for entity state that is not ranged', () => {
    const state = {
      myEntity: {
        entities: {},
        ids: []
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const range = getCurrentRange(entityState);
    expect(range).toBeUndefined();
  });

  test('should return true range object for entity state that is ranged', () => {
    const state = {
      myEntity: {
        entities: {},
        ids: [],
        currentRange: {
          start: 10,
          end: 19
        }
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const range = getCurrentRange(entityState);
    expect(range).toEqual({
      start: 10,
      end: 19
    });
  });
});

describe('getEntityIds()', () => {
  test('should return empty array for entity state that is not loaded', () => {
    const state = {
      myEntity: {
        entities: {},
        ids: []
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const ids = getEntityIds(entityState);
    expect(ids).toEqual([]);
  });

  test('should return array of ids for entity state that is loaded', () => {
    const state = {
      myEntity: {
        entities: {
          abc: {
            id: 'abc'
          }
        },
        ids: ['abc'],
        loadedAt: Date.now()
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const ids = getEntityIds(entityState);
    expect(ids).toEqual(['abc']);
  });
});

describe('mapToHasEntities()', () => {
  test('should return false for entity state that is not loaded', () => {
    const state = {
      myEntity: {
        entities: {},
        ids: []
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const ids = getEntityIds(entityState);
    const has = mapToHasEntities(ids);
    expect(has).toBeFalse();
  });

  test('should return true for entity state that is loaded', () => {
    const state = {
      myEntity: {
        entities: {
          abc: {
            id: 'abc'
          }
        },
        ids: ['abc'],
        loadedAt: Date.now()
      }
    };

    const info = setInfo(MyEntity);
    const entityState = getEntityState(info)(state);
    const ids = getEntityIds(entityState);
    const has = mapToHasEntities(ids);
    expect(has).toBeTrue();
  });
});

describe('warnIfMissingStore()', () => {
  test('should warn that app store is missing', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    warnIfMissingStore();
    expect(warnSpy).toHaveBeenCalledWith(
      '[NGRX-AE] Warning! The NGRX_AUTO_ENTITY_APP_STORE provider has not been configured! *IfNecessary actions require accessing your store in order to function properly!'
    );
  });

  test('should warn that app store is missing only once every 15 seconds', () => {
    const nowFunc = Date.now;
    try {
      const now = Date.now();
      const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(now);
      console.log('now', new Date(now));
      const warnSpy = jest.spyOn(console, 'warn');
      warnIfMissingStore();
      warnIfMissingStore();
      const now2 = new Date(now);
      console.log('now2', now2);
      nowSpy.mockReturnValue(
        new Date(now2.getFullYear(), now2.getMonth(), now2.getDate(), now2.getHours(), now2.getMinutes(), now2.getSeconds() + 5).valueOf()
      );
      const now2a = new Date(Date.now());
      console.log('now2a', now2a);
      warnIfMissingStore();
      const now3 = new Date(now);
      console.log('now3', now3);
      nowSpy.mockReturnValue(
        new Date(now3.getFullYear(), now3.getMonth(), now3.getDate(), now3.getHours(), now3.getMinutes(), now3.getSeconds() + 16).valueOf()
      );
      const now3a = new Date(Date.now());
      console.log('now3a', now3a);
      warnIfMissingStore();
      expect(warnSpy).toHaveBeenCalledTimes(2);
    } finally {
      Date.now = nowFunc;
    }
  });
});

describe('addSeconds()', () => {
  test('should add seconds to specified date', () => {
    const start = new Date();
    const addedTo = addSeconds(start, 12);
    expect(addedTo).toEqual(
      new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
        start.getSeconds() + 12,
        start.getMilliseconds()
      )
    );
  });
});

describe('nowAfterExpiry()', () => {
  test('should return true if current time is after specified date', () => {
    const expires = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds() - 10,
      new Date().getMilliseconds()
    );

    const after = nowAfterExpiry(expires);
    expect(after).toBeTrue();
  });

  test('should return false if current time is before specified date', () => {
    const expires = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds() + 10,
      new Date().getMilliseconds()
    );

    const after = nowAfterExpiry(expires);
    expect(after).toBeFalse();
  });

  test('should return false if current time is equal to specified date', () => {
    const expires = new Date();
    const after = nowAfterExpiry(expires);
    expect(after).toBeFalse();
  });
});
