import { ENTITY_OPTS_PROP, NAE_KEY_NAMES, NAE_KEYS } from './entity-tokens';

describe('Constant: ENTITY_OPTS_PROP', () => {
  test('should equal "__nae_entity_opts"', () => {
    expect(ENTITY_OPTS_PROP).toBe('__nae_entity_opts');
  });
});

describe('Constant: NAE_KEYS', () => {
  test('should equal "__nae_keys"', () => {
    expect(NAE_KEYS).toBe('__nae_keys');
  });
});

describe('Constant: NAE_KEY_NAMES', () => {
  test('should equal "__nae_key_names"', () => {
    expect(NAE_KEY_NAMES).toBe('__nae_key_names');
  });
});
