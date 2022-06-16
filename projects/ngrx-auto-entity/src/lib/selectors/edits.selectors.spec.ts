import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { makeEntity } from '../util/make-entity';
import { mapToEditedEntity, mapToIsDirty } from './edits.selectors';

@Entity({
  modelName: 'Test'
})
class Test {
  @Key id: number;
  name: string;
}

const makeTestModel = makeEntity(Test);

describe('mapToEditedEntity', () => {
  it('should return undefined if not editing', () => {
    const edited = mapToEditedEntity(undefined);
    expect(edited).toBeUndefined();
  });

  it('should return edited entity if editing', () => {
    const edited = mapToEditedEntity({ editedEntity: makeTestModel({ id: 123, name: 'Test' }) });
    expect(edited).toEqual({ id: 123, name: 'Test' });
  });
});

describe('mapToIsDirty', () => {
  it('should return false if not editing', () => {
    const dirty = mapToIsDirty(undefined);
    expect(dirty).toBe(false);
  });

  it('should return false if editing but not dirty', () => {
    const dirty = mapToIsDirty({ isDirty: false });
    expect(dirty).toBe(false);
  });

  it('should return true if editing and dirty', () => {
    const dirty = mapToIsDirty({ isDirty: true });
    expect(dirty).toBe(true);
  });
});
