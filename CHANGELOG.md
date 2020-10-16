<a name="0.5.0"></a>

# [0.5.0](https://github.com/briebug/ngrx-auto-entity/compare/0.4.2...0.5.0) Beta (2020-10-16)

Auto-Entity version 0.5 introduces several major enhancements over version 0.4. These features include
the addition of several new actions, including support for Upsert-style changes &amp; optional loading.
Result actions (success/failure) have been enhanced with additional data, providing all original params
and criteria passed to their corresponding initiating actions.

Optional loading, or "if necessary" actions, have been added to support more efficient loading of entities
by skipping the actual load, if the data has already been loaded and is in state. These actions require
access to entity state, which necessitated the addition of a new configuration provider injection token,
NGRX_AUTO_ENTITY_APP_STORE, that must be configured by the app to allow auto-entity to check state in
*IfNecessary effects. Without proper configuration of the app store injection token, the *IfNecessary
effects will fail to function properly. Graceful fallback to descriptive errors will occur if the 
necessary config has not been performed by the developer. 

A range of new utility functions have been added to support the developer's utilization of entity meta-
data that is configured via the `@Entity` and `@Key` directives. This includes functions to retrieve the
various entity names, comparers, transformers, and other metadata. 

Several enhancements to the internal reducer have been made to improve reliability, enhance performance, and
provide richer error messaging to the developer. When the reducer cannot perform its job due to mis-configuration
of any automatic entity, additional errors will be reported to the browser console. These enhancements extend
to additional error reporting by the `buildState` functions as well, in an attempt to identify mis-configuration
as early as possible. Any misconfiguration that can be detected will now be reported to the browser console,
along with instructions to fix (with example code) whenever possible. 

Internal code cleanup and restructuring has been performed to achieve better organization and support long-term
maintenance of the project as well. Internal re-org breaks previously very large code files into much smaller
files, such as actions, operators, decorators and support code, utility functions, etc. 

NOTE: Internal restructuring may potentially be **breaking** to consumers of NgRx Auto-Entity if they are by 
chance importing anything from internal (non public-api) paths in the library!

NgRx Auto-Entity has been verified to work with Angular 8 and 9. Angular 10 may work, depending on the use
cases and exact configuration of Angular. Further testing will be performed for Angular 10 support, and 
updates may be forthcoming to add deeper support for Angular 10.

NgRx Auto-Entity is now properly licensed under the MIT Open Source License!

### Features
- **actions:** Add `Upsert`/`UpsertMany` actions to support upsert style changes (#109)
- **service:** Add `upsert`/`upsertMany` handlers to entity service (#109)
- **reducer:** Add support for upsert style changes (#109)
- **facades:** Add support for `upsert`/`upsertMany` (#109)
- **actions:** Add optional `key` params for load actions (#99)
- **facades:** Add optional `key` params for load methods on facades (#99)
- **facades:** Correlation Id passed to/created by facade methods now returned (#124)
- **decorators:** Add utility functions for retrieving metadata configured by `@Entity` decorator (#107) 
- **decorators:** Add utility functions for retrieving entity key directly from properly prototyped entity object (#140) 
- **service:** Add utility functions for applying entity transformations by developer (#95)
- **decorators:** Add support for named comparers for custom sorting (#138)
- **selectors:** Add parameterized selectors for custom sorted entities (#138)
- **facades:** Add parameterized selection for custom sorted entities (#138)
- **util:** Add `makeEntity` utility function for converting POJOs to prototyped entity objects (#139)
- **actions:** Add `EditByKey` action to support initiating edits by entity key, if entity is in state (#145)
- **facades:** Add `editByKey` method to support initiating editd by entity key (#145)
- **actions:** Add new actions to support loading (of all kinds), only "if necessary" (#144)
- **decorators:** Add `defaultMaxAge` to `@Entity` decorator for "if necessary" support (#144)
- **decorators:** Add `EntityAge` enum with set of predefined common ages for use with "if necessary" ages (#144)
- **decorators:** Add support for "simplified" `@Entity` decorator usage of passing model name as string only (#141)

### Enhancements
- **service:** Will now pass `criteria` as optional parameter to all data transformers (#93)
- **selectors:** Clarified return types on selectors where `null` was a possibility for stronger typing
- **reducer:** Refactored reductions to use local (non-observable) mutations for significant performance improvements (#94)
- **actions:** Success & Failure actions now include all relevant original params & criteria passed to initiation actions (#115, #129)

### Internal
- **all:** Clean up internal imports to avoid `../..` reference
- **selectors:** Extracted all selector projection mappers to discrete functions
- **actions:** Break out all actions into discrete files for each set of initiating/result actions
- **actions:** Break out action support types and operators into their own files
- **decorators:** Break out decorators into discrete files
- **decorators:** Break out support types, utils, etc. for decorators into their own files

### Bug Fix
- **state:** Convert all timestamps in state to unix times (`number`) to resolve serialization issues (#98)
- **reducer:** Resolved issues where reducer attempted to modify immutable entity and ids (#94)
- **selectors:** Update selectors to convert unix times to `Date` to maintain public API (#98)
- **selectors:** Resolved issues with "Invalid Date" errors from timestamp selectors (#112)
- **selectors:** Refactored `all` and `sorted` selectors to be based off other selectors to avoid unnecessary re-emissions (#113)
- **util:** Updated key retrieval functions to log console errors if keys cannot be retrieved due to config issues (#134)
- **reducer:** Updated reducer to log console errors and NOT update state if keys may not be retrieved safely (#134)
- **util:** Updated `buildState` functions to log console errors and throw if entities are mis-configured
- **reducer:** Updated Edit reduction to preserve prior state if entity key matches existing edit (#143)
- **actions:** Resolve issue where some result actions were not properly correlating to their initiating actions (#153)

### Breaking Changes !!
- **all:** Major internal code restructuring may break consumers that import from anywhere other than public api


<a name="0.4.2"></a>

# [0.4.2](https://github.com/briebug/ngrx-auto-entity/compare/0.4.1...0.4.2) Beta (2020-02-13)

Introduces entity data transformation feature to enable `fromServer` and `toServer` data transformations via
the `transform` property on the `@Entity` decorator. Each transformation may optionally implement `fromServer`
and/or `toServer`. When a transformation is implemented for a given direction, it will be applied to data
flowing in that direction. If transformations are present, they will be applied in the order specified.

Data transformations may be used to convert things such as dates from UTC strings on the server, to actual 
`Date` objects in the client during loads, and back again during saves. Transform implementations are 
type-free, allowing any form of data to be handled as input, and any form of data to be returned as output.
This allows transformations to be highly composable if necessary.

The `IAutoEntityService` interface has been enhanced to include, as a final parameter for modification methods,
an additional `originalEntity` property. This is the entity before transformation, in the event that the
original data is required by an entity service implementation.

Transforms must be configured for each entity. No global transformations are supported at the current time.

Resolves #59 

### Features
- **actions:** Includes `transform` in `IEntityInfo` attached to every auto-entity action
- **service:** Refactored to handle transformation of all data, to and from server, for all entities, if configured via `@Entity`
- **service:** Extended `IAutoEntityService` interface to include support for `originalEntity` (pre-transformation)
- **decorators:** Add new, optional `transform` property that accepts an array of `IEntityTransformation` implementations


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
