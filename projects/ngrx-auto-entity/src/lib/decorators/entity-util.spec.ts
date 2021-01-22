import { Entity } from './entity-decorator';
import { entityComparer, entityMaxAge, entityTransforms, nameOfEntity, pluralNameOfEntity, uriNameOfEntity } from './entity-util';
import { Key } from './key-decorator';

@Entity({
  modelName: 'TestEntity',
  pluralName: 'TestEntities',
  uriName: 'test-entities',
  defaultMaxAge: 600,
  comparer: (a: any, b: any) => a.id - b.id,
  comparers: {
    default: 'id',
    id: (a: any, b: any) => a.id - b.id,
    name: (a: any, b: any) => a.name.localeCompare(b.name)
  },
  transform: [
    {
      fromServer: data => data,
      toServer: entity => entity
    }
  ]
})
class TestEntity {
  @Key id: number;
  name: string;
}

class NotAnEntity {}

describe('nameOfEntity()', () => {
  it('should return name of entity type if decorated', () => {
    const name = nameOfEntity(TestEntity);
    expect(name).toBe('TestEntity');
  });

  it('should return name of entity instance if decorated', () => {
    const name = nameOfEntity(new TestEntity());
    expect(name).toBe('TestEntity');
  });

  it('should return nullish if entity null', () => {
    const name = nameOfEntity(null);
    expect(name).toBeUndefined();
  });

  it('should return nullish if entity undefined', () => {
    const name = nameOfEntity(undefined);
    expect(name).toBeUndefined();
  });

  it('should return nullish if entity is not decorated', () => {
    const name = nameOfEntity(new NotAnEntity());
    expect(name).toBeUndefined();
  });
});

describe('uriNameOfEntity()', () => {
  it('should return uri name of entity type if decorated', () => {
    const name = uriNameOfEntity(TestEntity);
    expect(name).toBe('test-entities');
  });

  it('should return uri name of entity instance if decorated', () => {
    const name = uriNameOfEntity(new TestEntity());
    expect(name).toBe('test-entities');
  });

  it('should return nullish if entity null', () => {
    const name = uriNameOfEntity(null);
    expect(name).toBeUndefined();
  });

  it('should return nullish if entity undefined', () => {
    const name = uriNameOfEntity(undefined);
    expect(name).toBeUndefined();
  });

  it('should return nullish if entity is not decorated', () => {
    const name = uriNameOfEntity(new NotAnEntity());
    expect(name).toBeUndefined();
  });
});

describe('pluralNameOfEntity()', () => {
  it('should return plural name of entity type if decorated', () => {
    const name = pluralNameOfEntity(TestEntity);
    expect(name).toBe('TestEntities');
  });

  it('should return plural name of entity instance if decorated', () => {
    const name = pluralNameOfEntity(new TestEntity());
    expect(name).toBe('TestEntities');
  });

  it('should return nullish if entity null', () => {
    const name = pluralNameOfEntity(null);
    expect(name).toBeUndefined();
  });

  it('should return nullish if entity undefined', () => {
    const name = pluralNameOfEntity(undefined);
    expect(name).toBeUndefined();
  });

  it('should return nullish if entity is not decorated', () => {
    const name = pluralNameOfEntity(new NotAnEntity());
    expect(name).toBeUndefined();
  });
});

describe('entityComparer()', () => {
  it('should return comparer of entity type if decorated', () => {
    const comparer = entityComparer(TestEntity);
    expect(comparer).toBeTruthy();
    expect(comparer).toBeInstanceOf(Function);
  });

  it('should return named comparer of entity type if decorated', () => {
    const comparer = entityComparer(TestEntity, 'name');
    expect(comparer).toBeTruthy();
    expect(comparer).toBeInstanceOf(Function);
  });

  it('should return comparer of entity instance if decorated', () => {
    const comparer = entityComparer(new TestEntity());
    expect(comparer).toBeTruthy();
    expect(comparer).toBeInstanceOf(Function);
  });

  it('should return named comparer of entity instance if decorated', () => {
    const comparer = entityComparer(new TestEntity(), 'name');
    expect(comparer).toBeTruthy();
    expect(comparer).toBeInstanceOf(Function);
  });

  it('should return nullish if entity null', () => {
    const name = entityComparer(null);
    expect(name).toBeUndefined();
  });

  it('should return nullish if entity undefined', () => {
    const comparer = entityComparer(undefined);
    expect(comparer).toBeUndefined();
  });

  it('should return nullish if entity is not decorated', () => {
    const comparer = entityComparer(new NotAnEntity());
    expect(comparer).toBeUndefined();
  });
});

describe('entityTransforms()', () => {
  it('should return transforms of entity type if decorated', () => {
    const transforms = entityTransforms(TestEntity);
    expect(transforms).toBeTruthy();
    expect(Array.isArray(transforms)).toBe(true);
    expect(transforms.length).toBe(1);
  });

  it('should return transforms of entity instance if decorated', () => {
    const transforms = entityTransforms(new TestEntity());
    expect(transforms).toBeTruthy();
    expect(Array.isArray(transforms)).toBe(true);
    expect(transforms.length).toBe(1);
  });

  it('should return nullish if entity null', () => {
    const transforms = entityTransforms(null);
    expect(transforms).toBeUndefined();
  });

  it('should return nullish if entity undefined', () => {
    const transforms = entityTransforms(undefined);
    expect(transforms).toBeUndefined();
  });

  it('should return nullish if entity is not decorated', () => {
    const transforms = entityTransforms(new NotAnEntity());
    expect(transforms).toBeUndefined();
  });
});

describe('entityMaxAge()', () => {
  it('should return max age of entity type if decorated', () => {
    const maxAge = entityMaxAge(TestEntity);
    expect(maxAge).toBe(600);
  });

  it('should return max age of entity instance if decorated', () => {
    const maxAge = entityMaxAge(new TestEntity());
    expect(maxAge).toBe(600);
  });

  it('should return nullish if entity null', () => {
    const transforms = entityMaxAge(null);
    expect(transforms).toBeUndefined();
  });

  it('should return nullish if entity undefined', () => {
    const transforms = entityMaxAge(undefined);
    expect(transforms).toBeUndefined();
  });

  it('should return nullish if entity is not decorated', () => {
    const transforms = entityMaxAge(new NotAnEntity());
    expect(transforms).toBeUndefined();
  });
});
