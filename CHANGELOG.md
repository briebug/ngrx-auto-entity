<a name="0.4.1"></a>

# [0.4.1](https://github.com/briebug/ngrx-auto-entity/compare/0.4.0...0.4.1) Beta (2020-02-09)

Introduces the ability to delete entities just by their key, or many entities by their keys. This allows
the deletion of entities without actually having the entity objects on hand. 

Also resolves an issue with clearing state, which would also clear custom developer-defined extra state
included alongside auto-entity managed state. 

### Features
- **actions**:** Add `DeleteByKey`, `DeleteManyByKeys` and related result actions (#85)
- **service:** Add support for `deleteByKey` and `deleteManyByKeys` methods in entity services (#85)
- **reducer:** Handles new delete by keys result actions to rmeove deleted entities and update deleting flags/timestamps (#85)
- **decorators:** Add support for new delete by keys actions in effect exclusion of `@Entity` decorator (#85)
- **facades:** Add `deleteByKey` and `deleteManyByKeys` methods to generated facades (#85)
- **effects:** Add operators and effects to handle delete by keys actions (#85)  

### Bug Fix
- **reducer:** No longer removes custom state when clearing auto-entity managed state with `Clear` action (#86)
- **util:** Fix `buildState` and `buildFeatureState` and related types to support custom properties in extra state under TS 3.x (#88)


<a name="0.4.0"></a>

# [0.4.0](https://github.com/briebug/ngrx-auto-entity/compare/0.3.1...0.4.0) Beta (2020-01-13)

Introducing the `@Entity` decorator for model classes. This decorator provides custom naming capabilities,
the ability to filter which auto-entity pre-fab effects handle each model, as well as define a default
comparer for sorting entities retrieved with a new .sorted$ stream on pre-fab facades.

### Features
- **decorators:** Add `@Entity` decorator for models with modelName, pluralName, uriName properties (#70)
- **decorators:** Add `excludeEffects` functionality to `@Entity` decorator for filtering which effects handle entity
- **decorators:** Add `comparer` property to `@Entity` decorator to support selecting sorted entities (#58)
- **selectors:** Add `selectAllSorted` selector that uses entity comparer to sort on selection (#58)
- **facades:** Add `sorted$` stream to return all entities in sorted order from `selectAllSorted` selector (#58)  

### Internal 

- **decorators:** Moved all decorators into internal /lib/decorators directory (will break direct imports, use public api!)

### Bug Fix
- **selectors:** Added additional falsy checks to all selectors to limit frequency of hard failures (#81)
- **decorators:** Added `modelName` to `@Entity` decorator to allow explicit definition of model name immune to mangling by code minifiers (#81) 

<a name="0.3.1"></a>

# [0.3.1](https://github.com/briebug/ngrx-auto-entity/compare/0.3.0...0.3.1) Beta (2020-01-07)

Bug fix release! We apologize for any inconvenience the v0.3.0 release may have caused. We introduced
a correlation Id into our actions, and relied on `uuidv4` to handle their generation. Turned out, uuidv4
just recently went through a breaking change, and the default import was removed. This caused problems,
dependent upon which version of uuidv4 was used by the application using ngrx-ae.

We have replaced uuidv4 with internal code. Fast, small uuid function acquired from the following gist:

https://gist.github.com/LeverOne/1308368

### Bug Fix
- **[uuidv4](https://www.npmjs.com/package/uuidv4):** Removed in favor of small, fast built in function 

<a name="0.3.0"></a>

# [0.3.0](https://github.com/briebug/ngrx-auto-entity/compare/0.2.8...0.3.0) Beta (2019-11-26)

This release adds the `correlationId` property (defaulting to `uuid()`) to `EntityAction` which should help in tracking correlated actions.
Correlated actions are usually sets of request/success/failure actions, such as `Create`, `CreateSuccess`, and `CreateFailure`.

### Features

- **correlated actions:** Add `correlationId` property to `EntityAction` for tracking correlated actions. (#75)

### Package

- **dependencies:** Add peer dependency on [uuidv4](https://www.npmjs.com/package/uuidv4)

### Breaking Changes !!

- [uuidv4](https://www.npmjs.com/package/uuidv4) will need to be added to your `package.json` as a dependency

### Security Updates

- [handlebars](https://github.com/briebug/ngrx-auto-entity/pull/82) bumped to 4.5.3


<a name="0.2.8"></a>

# [0.2.8](https://github.com/briebug/ngrx-auto-entity/compare/0.2.7...0.2.8) Beta (2019-11-19)

This release restores a missing action to the library public interface index.

### Bug Fixes

- **actions:** Add clear action to exported actions of public interface


<a name="0.2.7"></a>

# [0.2.7](https://github.com/briebug/ngrx-auto-entity/compare/0.2.6...0.2.7) Beta (2019-10-13)

This release restores a missing selector and adds a new factory function for use with
custom effects creation.

### Features

- **actions:** Add fromEntityTypes factory function for multi-entity multi-action effects filtering (#66)

### Bug Fixes

- **selectors:** Add createdAt facade getter and corresponding selectors (#65)



<a name="0.2.6"></a>

# [0.2.6](https://github.com/briebug/ngrx-auto-entity/compare/0.2.5...0.2.6) Beta (2019-09-05)

This release resolves two issues with multiple-entity deselections due to bugs in the
reduction of deselectMany and deselectAll.

### Features

- **actions:** Add input validation checks and exception throwing to selection related actions
- **reducer:** Fix issue with potential undefined in selection related reductions #62
- **reducer:** Fix issue with calls to Array.prototype.some on certain arrays being implemented incorrectly #60



<a name="0.2.5"></a>

# [0.2.5](https://github.com/briebug/ngrx-auto-entity/compare/0.2.2...0.2.5) Beta (2019-08-12)

This release add new actions (and related effects, reducers, selectors & facade features) for
edit and change tracking as well as adding more entities to the current set selection.

### Features

- **edit:** Add new `Edit`, `Change`, `EndEdit` actions and related functionality
- **selection:** Added new `selectMore` and `selectMoreByKeys`  actions and related functionality


<a name="0.2.2"></a>

# [0.2.2](https://github.com/briebug/ngrx-auto-entity/compare/0.2.1...0.2.2) Beta (2019-08-07)

This release focuses on reducing the intrinsic package size and total package+dependency size of
the library. Total library size is now ~10k or so smaller than before. Third party dependency on
changeCase, which included a lot of casing functionality this library did not directly require, has
been removed in favor of integrated case conversion code. Further size optimizations may be made
possible in the future with some additional internal restructuring.

For the most compatibility with future internal (but otherwise non-breaking) changes, make sure
you are importing from @briebug/ngrx-auto-entity and not from child paths within the library!

### Package

- **dependencies:** Remove direct dependency on changeCase, integrate functionality

### Features

- **utils:** Added a new `buildSelectorMap` utility function
- **utils:** Added a new `buildFacade` utility function

### Cleanup

- **operators:** Reduce duplication of code by pulling out error handling to function
- **utils:** Reduce duplication of code by pulling out selector map creation to function
- **actions:** Reduce duplication of code by moving common lines to EntityAction base type
- **actions:** Reduce duplication of code by moving entity action type checking into function

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
