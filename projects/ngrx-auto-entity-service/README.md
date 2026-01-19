[![Issues](https://img.shields.io/github/issues/briebug/ngrx-auto-entity.svg)](https://github.com/briebug/ngrx-auto-entity/issues)
![Version](https://img.shields.io/npm/v/@briebug/ngrx-auto-entity.svg)
![Downloads](https://img.shields.io/npm/dm/@briebug/ngrx-auto-entity.svg)
[![Downloads](https://img.shields.io/npm/dt/@briebug/ngrx-auto-entity.svg)](https://www.npmjs.com/package/@briebug/ngrx-auto-entity)

# NgRX Auto-Entity Service

Pre-fabricated, ready-to-go, reusable entity service for [@briebug/ngrx-auto-entity](https://github.com/briebug/ngrx-auto-entity)!

## What is it?

NgRX Auto-Entity Service provides a pre-fabricated entity service that interfaces with restful HTTP APIs
using Angular's HttpClient. It supports general CRUD operations It works with any entity using its `uriName` and the configured `urlPrefix` to
automatically generate the appropriate URL for the entity.

# Dependencies

NgRx Auto-Entity is compatible with the following versions.

| NgRx Auto Entity Service | NgRx Auto Entity | Angular Core | NgRx        | RxJs |
| ------------------------ | ---------------- | ------------ | ----------- | ---- |
| 21.x                     | 21.x             | 21.x         | 21.x        | 7.x  |
| 19.x                     | 19.x             | 19.x         | 19.x        | 7.x  |
| 18.x                     | 18.x             | 18.x         | 18.x        | 7.x  |
| 17.x                     | 17.x             | 17.x         | 17.x        | 7.x  |
| 13.x                     | 13.x             | 13.x - 16.x  | 13.x - 16.x | 7.x  |

[![Deps-AngularCore](https://img.shields.io/badge/@angular/core-%5E21.x-blue.svg)](https://github.com/angular/angular)
[![Deps-AngularCommon](https://img.shields.io/badge/@angular/common-%5E21.x-blue.svg)](https://github.com/angular/angular)
[![Deps-NgRxStore](https://img.shields.io/badge/@ngrx/store-%5E21.x-blue.svg)](https://github.com/ngrx/platform)
[![Deps-RxJs](https://img.shields.io/badge/rxjs-%5E7.x-blue.svg)](https://github.com/reactivex/rxjs)

# Installation

Install @briebug/ngrx-auto-entity-service from npm:

- `npm install @briebug/ngrx-auto-entity-service`,
- `yarn add @briebug/ngrx-auto-entity-service`, or
- `pnpm add @briebug/ngrx-auto-entity-service`

## Quick Start

If you want to get rolling as quickly and simply as possible, you may jump to the
[quick start guide](https://briebug.gitbook.io/ngrx-auto-entity/getting-started/quick-start).
(Note: Documentation still in progress!)

## Full Usage Documentation

If you wish to learn more about how Auto-Entity works, you may jump to the
[full usage documentation](https://briebug.gitbook.io/ngrx-auto-entity/advanced/usage).
(Note: Documentation still in progress!)

# Roadmap

- [x] Initial design of automatic actions
- [x] Automatic service mapping & lookup
- [x] Custom criteria
- [x] Default effects
- [x] Composite keys
- [x] Get entity key support on entities
- [x] Built-in loading indicator tracking
- [x] Built-in saving indicator tracking
- [x] Built-in deleting indicator tracking
- [x] Built-in entity selection support
- [x] Dynamically generated per-entity actions
- [x] Dynamically generated per-entity selectors
- [x] Pre-fabricated facade generation
- [x] Generated stub reducers
- [x] Automatic correlation of related initiating and result actions
- [x] Enhanced IEntityInfo interface with naming utilities
- [x] Filtering of entities effects handle
- [x] Custom transformation of data to and from the server (i.e. ISO date to Date())
- [x] Optional data loading it not already present, with max age
- [x] Normalization of API with NgRx 8 functional/factory function architecture
- [ ] Dynamic generate-only-on-use design
- [ ] Extended effects for loading indicator display, toasts or snackbars, etc.
- [ ] Filtering of entities meta reducer handles
- [ ] Pre-fabricated, ready-to-go, reusable entity services

# Contributors

[![Follow-BB](https://img.shields.io/twitter/follow/briebugsoftware.svg?style=flat)](https://twitter.com/briebugsoftware)
[![Follow-BB](https://img.shields.io/twitter/follow/jonristadev.svg?style=flat)](https://twitter.com/JonRistaDev)
[![Follow-BB](https://img.shields.io/twitter/follow/kevinschuchard.svg?style=flat)](https://twitter.com/kevinschuchard)
[![Follow-BB](https://img.shields.io/twitter/follow/anthonyjones519.svg?style=flat)](https://twitter.com/anthonyjones519)

- [Jesse Sanders](https://github.com/jessesanders): Evil Mastermind!
- [Jon Rista](https://github.com/jrista): Design, Architecture & Implementation
- [Kevin Schuchard](https://github.com/schuchard): Design & Implementation
- [Brian Love](https://github.com/blove): Design & Implementation
- [Jesse Wells](https://github.com/Wells-Codes): Implementation
- [Alice Paquette](https://github.com/paquettealice): Implementation
- [Patrice Paquette](https://github.com/patpaquette): Implementation
- [Anthony Jones](https://github.com/anthonymjones): Implementation
