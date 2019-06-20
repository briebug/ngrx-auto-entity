<a name="0.1.1"></a>

# [0.1.1](https://github.com/briebug/ngrx-auto-entity/compare/0.1.0...0.1.1) Beta (2019-06-20)

### Bug Fixes

- **operators:** Restore missing operators for `many` alts of: Load, Create, Replace, Delete
- **effects:** Restore missing effects for `many` alts of: Load, Create, Replace, Delete
- **service:** Restore missing service methods for `many` alts of: Load, Create, Replace, Delete
- **api:** Move AOT-compatible export bundle into `index.ts`, re-export index from `public_api.ts`, to improve auto-import functionality in IDEs

### Testing

- **reducer:** Add additional test cases for `many` alts

### Broken Features !!

- **features:** Feature state via `buildFeatureState` will not function at runtime due to issues locating lazy module `Injector` instances

<a name="0.1.0"></a>

# [0.1.0](https://github.com/briebug/ngrx-auto-entity/compare/0.0.15...0.1.0) Beta (2019-05-23)

### Features

- **util:** Added pre-fabricated facades to `buildState` utilities
- **util:** Added pre-fabricated reducer to `buildState` utilities

<a name="0.0.15"></a>

# [0.0.15](https://github.com/briebug/ngrx-auto-entity/compare/0.0.13...0.0.15) Alpha (2019-02-20)

### Bug Fixes

- **actions:** Fixed incorrect action type for `SelectByKey` action

### Breaking Changes !!

- **paging:** Changed `IEntityPageRef<TModel>`'s `.page` property from `number` to `IPageInfo`
- **paging:** Changed currentPage state from `number` to `IPageInfo`

### Features

- **actions:** Added `LoadMany` action to retrieve many, but not all, entities
- **actions:** Added `CreateMany` action to bulk create many entities at once
- **actions:** Added `DeleteMany` action to bulk delete many entities at once
- **actions:** Added `ReplaceMany` action to bulk replace (PUT) many entities at once
- **selectors:** Added `currentEntityKey` selector to retrieve just the key of current entity
- **util:** Added utility functions to retrieve entity key from decorated models

<a name="0.0.13"></a>

# 0.0.13 Alpha (2018-11-04)

### Features

- **actions:** Added `UpdateMany` action to update (PATCH) many, but not all, entities

<a name="0.0.12"></a>

# 0.0.12 Alpha (2018-10-16)

### Bug Fixes

- **reducer:** Fixed reducer so that single entity loads "merge" into existing entities and ids state

<a name="0.0.11"></a>

# 0.0.11 Alpha (2018-09-27)

### Bug Fixes

- **reducer:** Added spreads for original entityState when reducing loads (so we don't lose other state)

<a name="0.0.10"></a>

# 0.0.10 Alpha (2018-09-25)

### Bug Fixes

- **errors:** Enhanced error reporting top eliminate undefined exceptions in browser console

<a name="0.0.9"></a>

# 0.0.9 Alpha (2018-09-24)

### Features

- **selectors:** Add support for selecting and deselecting entities in state
- **selectors:** Add support for loading, sacing and deleting status in state
- **util:** Add getEntityKey to expose a means to get the entity key for an entity by a developer
- **decorators:** Updated `@Key` decorator to support composite keys (decorate multiple model properties)

<a name="0.0.8"></a>

# 0.0.8 Alpha (2018-09-17)

### Bug Fixes

- **operators:** Switched from switchMap/exhaustMap/concatMap to mergeMap to ensure support for concurrent handling of actions by effects

<a name="0.0.7"></a>

# 0.0.7 Alpha (2018-09-17)

### Bug Fixes

- **decorators:** Add explicit checks for `@Key` on models and custom errors if missing

<a name="0.0.6"></a>

# 0.0.6 Alpha (2018-09-17)

### Package

- **readme:** Added readme to package so it will display on npmjs

<a name="0.0.5"></a>

# 0.0.5 Alpha (2018-08-16)

### Package

- **readme:** Updated readme

<a name="0.0.4"></a>

# 0.0.4 Alpha (2018-08-15)

### Package

- **readme:** Updated readme and usage documentation

<a name="0.0.3"></a>

# 0.0.3 Alpha (2018-08-15)

### Package

- **demo:** Updated demo app to reference @briebug/ngrx-auto-entity instead of relative path

<a name="0.0.2"></a>

# 0.0.2 Alpha (2018-08-13)

### Features

- **util:** Added default selectors for page and range in selectors returned by `buildState`

<a name="0.0.1"></a>

# 0.0.1 Alpha (2018-08-13)

### Package

- **readme:** Added readme, quickstart and detailed usage documentation

<a name="0.0.0"></a>

# 0.0.0 Initial (2018-06-11)

### Package

- **migrate:** Migrate code from old repo to new repo
- **renamed:** Renamed project NgRx Auto-Entity!
