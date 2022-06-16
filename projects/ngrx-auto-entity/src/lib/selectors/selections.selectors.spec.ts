import { mapToCurrentEntities, mapToCurrentEntitiesKeys, mapToCurrentEntity, mapToCurrentEntityKey } from './selections.selectors';

describe('mapToCurrentEntity', () => {
  it('should return undefined if no selections root', () => {
    const current = mapToCurrentEntity(undefined, undefined);
    expect(current).toBeUndefined();
  });

  it('should return undefined if no entities root', () => {
    const current = mapToCurrentEntity({}, undefined);
    expect(current).toBeUndefined();
  });

  it('should return undefined if empty root', () => {
    const current = mapToCurrentEntity({}, {});
    expect(current).toBeUndefined();
  });

  it('should return undefined if no entity matching current entity key', () => {
    const current = mapToCurrentEntity({ currentEntityKey: 1 }, { 2: { id: 2 } });
    expect(current).toBeUndefined();
  });

  it('should return entity matching current entity key', () => {
    const current = mapToCurrentEntity({ currentEntityKey: 2 }, { 2: { id: 2 } });
    expect(current).toEqual({ id: 2 });
  });
});

describe('mapToCurrentEntityKey', () => {
  it('should return undefined if no selections root', () => {
    const key = mapToCurrentEntityKey(undefined);
    expect(key).toBeUndefined();
  });

  it('should return undefined if enmpty selections root', () => {
    const key = mapToCurrentEntityKey({});
    expect(key).toBeUndefined();
  });

  it('should return current entity key', () => {
    const key = mapToCurrentEntityKey({ currentEntityKey: 2 });
    expect(key).toBe(2);
  });
});

describe('mapToCurrentEntities', () => {
  it('should return empty array if no selections root', () => {
    const current = mapToCurrentEntities(undefined, undefined);
    expect(current).toEqual([]);
  });

  it('should return empty array if no entities root', () => {
    const current = mapToCurrentEntities({}, undefined);
    expect(current).toEqual([]);
  });

  it('should return empty array if empty root', () => {
    const current = mapToCurrentEntities({}, {});
    expect(current).toEqual([]);
  });

  it('should return empty array if no entities matching current entity keys', () => {
    const current = mapToCurrentEntities(
      { currentEntitiesKeys: [1, 4, 6, 8, 9, 10] },
      {
        2: { id: 2 },
        3: { id: 3 },
        5: { id: 5 },
        7: { id: 7 },
        11: { id: 11 },
        13: { id: 13 }
      }
    );
    expect(current).toEqual([]);
  });

  it('should return entities matching current entity keys', () => {
    const current = mapToCurrentEntities(
      { currentEntitiesKeys: [2, 3, 5, 7, 11, 13] },
      {
        2: { id: 2 },
        3: { id: 3 },
        5: { id: 5 },
        7: { id: 7 },
        11: { id: 11 },
        13: { id: 13 }
      }
    );
    expect(current).toEqual([{ id: 2 }, { id: 3 }, { id: 5 }, { id: 7 }, { id: 11 }, { id: 13 }]);
  });
});

describe('mapToCurrentEntitiesKeys', () => {
  it('should return empty array if no selections root', () => {
    const key = mapToCurrentEntitiesKeys(undefined);
    expect(key).toEqual([]);
  });

  it('should return empty array if enmpty selections root', () => {
    const key = mapToCurrentEntitiesKeys({});
    expect(key).toEqual([]);
  });

  it('should return current entity keys', () => {
    const key = mapToCurrentEntitiesKeys({ currentEntitiesKeys: [2, 3, 5, 7, 11, 13] });
    expect(key).toEqual([2, 3, 5, 7, 11, 13]);
  });
});
