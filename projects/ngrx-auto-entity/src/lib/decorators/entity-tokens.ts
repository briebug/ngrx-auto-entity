// NOTE: The following constants should be Symbol() to avoid any potential conflict with
// any user-defined properties on the entity models. However, use of Symbol() here causes
// problems with the Jest test runner at the current time

export const ENTITY_OPTS_PROP = '__nae_entity_opts';
export const NAE_KEYS = '__nae_keys';
export const NAE_KEY_NAMES = '__nae_key_names';
