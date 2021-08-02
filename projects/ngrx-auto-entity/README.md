[![CircleCI](https://img.shields.io/circleci/build/github/briebug/ngrx-auto-entity/develop.svg)](https://circleci.com/gh/briebug/ngrx-auto-entity)
[![Issues](https://img.shields.io/github/issues/briebug/ngrx-auto-entity.svg)](https://github.com/briebug/ngrx-auto-entity/issues)
![Version](https://img.shields.io/npm/v/@briebug/ngrx-auto-entity.svg)
![Downloads](https://img.shields.io/npm/dm/@briebug/ngrx-auto-entity.svg)
[![Downloads](https://img.shields.io/npm/dt/@briebug/ngrx-auto-entity.svg)](https://www.npmjs.com/package/@briebug/ngrx-auto-entity)



# NgRX Auto-Entity

Automatic entities for [@ngrx](https://github.com/ngrx/platform)! Simplifying reactive state!

**Announcing: ANGULAR 12 is now supported! NgRx Auto-Entity has been updated to support the latest
versions of Angular, as well as NgRx through version 12. With this update, we have also dropped
support for Angular 8, meaning the supported versions of angular are 9-12.**

**NOTE: Angular 13 support is being researched. Starting with Ng 13, all View Engine support will
be dropped from the platform completely. One of our goals with Auto-Entity has been to support
older versions of angular as long as possible, given the often slower upgrade times for many 
companies. With Ng 13 putting the burden on library developers to support Ivy, that forces
groups like ourselves to build our library to target specific instruction sets. That will
increase the challenge of supporting older versions of Angular. As such, we are actively looking
for ways to deal with that scenario, and hope to be prepared when the time comes.**

**NOTE: NgRX Auto-Entity is currently a _beta_ library. It is in flux as we continue to refine and
enhance it's functionality, identify and eliminate bugs, optimize it's performance. If you
find any errors in this documentation, or bugs within the library, please let us know!**

## What is it?

NgRX Auto-Entity aims to provide a seamless means of dealing with standard entity actions and
effects with minimal repetitive code requirements, while preserving the fundamental nature of
NgRX itself. This library is not a replacement for or alternative to NgRX. It works within the
standard paradigm that NgRX has set forth, making use of actions, reducers & effects like any
other NgRX application.

What Auto-Entity does do is provide a set of ready-made actions, selectors, effects & a core
metareducer for handling all of the standard CRUD functionality for entities, so you neither
have to write nor generate any of that code yourself. Auto-Entity supports implementing applications
with recommended best practices, including good action hygiene. Auto-Entity also generates 
**pre-fabricated facades** around NgRx and the store/state, providing a cohesive, logical and
simplified API into your state for those who prefer facades. Auto-Entity presents a flexible
framework that you may use in its entirety for all of your entity needs, or use piecemeal as 
necessary in order to achieve your specific goals.

While it is not required and Auto-Entity is an entirely independent library that solely depends
on Angular and NgRX, Auto-Entity manages state in a manner that is compatible with @ngrx/entity
as well, in the event you wish to utilize some of the utilities from that library in your own
custom reducers.

# Dependencies

NgRx Auto-Entity currently depends on Angular 9+, NgRx 9+ and RxJs 6. 


[![Deps-AngularCore](https://img.shields.io/badge/@angular/core-%5E9.x-blue.svg)](https://github.com/angular/angular)
[![Deps-AngularCommon](https://img.shields.io/badge/@angular/common-%5E9.x-blue.svg)](https://github.com/angular/angular)
[![Deps-NgRxStore](https://img.shields.io/badge/@ngrx/store-%5E9.x-blue.svg)](https://github.com/ngrx/platform)
[![Deps-RxJs](https://img.shields.io/badge/rxjs-%5E6.x-blue.svg)](https://github.com/reactivex/rxjs)

# Installation

Install @briebug/ngrx-auto-entity from npm:

`npm install @briebug/ngrx-auto-entity` or `yarn add @briebug/ngrx-auto-entity`

If you have not already, install the required peer dependencies as well:

`npm install @ngrx/{effects,store,store-devtools}` or `yarn add @ngrx/{effects,store,store-devtools}`

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

