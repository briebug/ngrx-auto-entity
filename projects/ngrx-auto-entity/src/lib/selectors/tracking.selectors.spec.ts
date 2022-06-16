import {
  mapToCreatedAt,
  mapToDeletedAt,
  mapToLoadedAt,
  mapToReplacedAt,
  mapToSavedAt,
  mapToUpdatedAt
} from './tracking.selectors';

describe('mapToLoadedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToLoadedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if loadedAt state is falsy', () => {
    const ts = mapToLoadedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToLoadedAt({ loadedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToSavedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToSavedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if savedAt state is falsy', () => {
    const ts = mapToSavedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToSavedAt({ savedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToCreatedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToCreatedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if createdAt state is falsy', () => {
    const ts = mapToCreatedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToCreatedAt({ createdAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToUpdatedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToUpdatedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if updatedAt state is falsy', () => {
    const ts = mapToUpdatedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToUpdatedAt({ updatedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToReplacedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToReplacedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if replacedAt state is falsy', () => {
    const ts = mapToReplacedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToReplacedAt({ replacedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});

describe('mapToDeletedAt()', () => {
  it('should return undefined if state falsy', () => {
    const ts = mapToDeletedAt(null);
    expect(ts).toBeUndefined();
  });

  it('should return undefined if deletedAt state is falsy', () => {
    const ts = mapToDeletedAt({});
    expect(ts).toBeUndefined();
  });

  it('should return Date', () => {
    const now = Date.now();
    const ts = mapToDeletedAt({ deletedAt: now });
    expect(ts).toStrictEqual(new Date(now));
  });
});
