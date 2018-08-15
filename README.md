[![CircleCI](https://circleci.com/gh/briebug/ngrx-auto-entity/tree/develop.svg?style=svg&circle-token=d1d500027a81dda34d4ad75ae5fee38dd8953487)](https://circleci.com/gh/briebug/ngrx-auto-entity/tree/develop)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# NgRX Auto-Entity

Automatic entities for [@ngrx](https://github.com/ngrx/platform)! With this library, you can take the weight off your plate, and
get back to business!

**NOTE: NgRX Auto-Entity is currently a _beta_ library. It is in flux as we continue to refine and
enhance it's functionality, identify and eliminate bugs, optimize it's performance. If you
find any errors in this documentation, or bugs within the library, please let us know!**

## What is it?

NgRX Auto-Entity aims to provide a seamless means of dealing with standard entity actions and
effects with minimal repetitive code requirements, while preserving the fundamental nature of
NgRX itself. This library is not a replacement for or alternative to NgRX. It works within the
standard paradigm that NgRX has set forth, making use of actions, reducers & effects like any
other NgRX application.

What Auto-Entity does do is provide a set of ready-made, generic actions for handling all of
the standard CRUD operations for entities, so you neither have to write nor generate any of that
code yourself. Auto-Entity presents a flexible framework that you may use in its entirety for
all of your entity needs, or use piecemeal as necessary in order to achieve your specific goals.

While it is not required and Auto-Entity is an entirely independent library that solely depends
on Angular 6 and NgRX 6, Auto-Entity manages state in a manner that is compatible with @ngrx/entity
as well, in the event you wish to utilize some of the utilities from that library in your own
custom reducers.

# Installation

Install @briebug/ngrx-auto-entity from npm:

`npm install @briebug/ngrx-auto-entity` or `yarn add @briebug/ngrx-auto-entity`

If you have not already, install the required peer dependencies as well:

`npm install @ngrx/{effects,store,store-devtools} ngrx-store-freeze` or `yarn add @ngrx/{effects,store,store-devtools} ngrx-store-freeze`

## Quick Start

If you want to get rolling as quickly and simply as possible, you may jump to the [quick start guide](QUICKSTART.md).

## Full Usage Documentation

If you wish to learn more about how Auto-Entity works, you may jump to the [full usage documentation](USAGE.md).

# Roadmap

- [x] Initial design of automatic actions
- [x] Automatic service mapping & lookup
- [x] Custom criteria
- [x] Default effects
- [ ] Built-in loading indicator support
- [ ] Built-in entity selection support
- [ ] Composite keys
- [ ] Extended effects for loading indicator display, toasts or snackbars, etc.
- [ ] Filtering of entities meta reducer handles
- [ ] Filtering of entities effects handle

# Contributors

- [Jon Rista](https://github.com/jrista): Design & Implementation
- [Brian Love](https://github.com/blove): Design & Implementation
- [Anthony Jones](https://github.com/anthonymjones): Implementation
- [Andy Pickler](https://github.com/BigGillyStyle): Implementation
