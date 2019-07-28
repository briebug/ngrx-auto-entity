<a name="0.2.1"></a>

# [0.2.1](https://github.com/briebug/ngrx-auto-entity/compare/0.2.0...0.2.1) Beta (2019-07-28)

### Bug Fixes

- **service:** Remove legacy reference to Ramda


<a name="0.2.0"></a>

# [0.2.0](https://github.com/briebug/ngrx-auto-entity/compare/0.1.1...0.2.0) Beta (2019-07-25)

This version introduces some fundamental changes to how NgRx Auto-Entity is initialized, additional
features and functionality, as well as some breaking changes to facade properties. Many of these changes
further reduce the already minimal boilerplate with Auto-Entity.

### Documentation

Extensive documentation, examples and a proper quickstart guide have been added to our [GitBook](https://briebug.gitbook.io/ngrx-auto-entity/).

### Platform Update

This release involves a major update to the minimum required Angular and NgRx versions. In order to leverage
updated functionality from both libraries, as well as begin phasing in improved use of TypeScript, both platforms
have been updated to the 8.x versions. We apologize for any inconvenience this may cause, however we do believe
the changes and future improvements allowed by making this change will be welcome.

 - **angular:** The required version of @angular has been bumped up to 8.0
 - **ngrx:** The required version of @ngrx has been bumped uop to 8.0

### Features
 - **actions:** Added multiple entity selection and deselection actions
 - **effects:** Added new `ExtraEffects` class containing selection and clearing related effects
 - **operators:** Added new operators to handle selection and clearing related actions
 - **reducer:** Updated meta reducer to handle new multiple entity selection and deselection
 - **facade:** Updated facade base class to include support for multiple entity selections
 - **module:** `NgrxAutoEntityModule` will now automatically provide `autoEntityMetaReducer` in `META_REDUCERS`
 - **module:** `NgrxAutoEntityModule` will now automatically provide `EntityEffects` and `ExtraEffects`
 - **module** Must now call `.forRoot(()` or `.forFeature()` as appropriate to import module
 - **module:** A new `.forRootNoEntityEffects()` can be used instead of `.forRoot()` to disable auto-provisioning of entity effects (keeps extra effects)
 - **module:** A new `.forRootNoEffects()` can be used instead of `.forRoot()` to disable auto-provisioning of all effects

### Bug Fixes
 - **module:** Implemented `.forRoot()` and `.forFeature()` calls on `NgrxAutoEntityModule` to fix broken support for lazy loaded modules
 - **effects:** Added missing effects for select/deselect actions to dispatch selected/deselected counterparts
 - **service:** Updated `NgrxAutoEntityService` to support aggregate Injector tree so that models/entity services in lazy loaded modules will be found by root entity service
 - **util:** Changed `interface ITModelType<TModel>` to a `type IModelType<TModel>` to better conform to TypeScript best practices
 
 ### Breaking Changes !!
  - **facade:** Updated facade base class to include a $ postfix on all streaming properties
 


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
