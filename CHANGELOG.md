<a name="0.0.15"></a>

# [0.0.15](https://github.com/briebug/ngrx-auto-entity/compare/0.0.13...0.0.15) Alpha (2019-02-20)

### Bug Fixes

- **actions:** Fixed incorrect action type for SelectByKey action

### Breaking Changes !!

- **paging:** Changed `IEntityPageRef<TModel>`'s `.page` property from `number` to `IPageInfo`
- **paging:** Changed currentPage state from `number` to `IPageInfo`

### Features

- **actions:** Added LoadMany action to retrieve many, but not all, entities
- **actions:** Added CreateMany action to bulk create many entities at once
- **actions:** Added DeleteMany action to bulk delete many entities at once
- **actions:** Added ReplaceMany action to bulk replace (PUT) many entities at once
- **selectors:** Added currentEntityKey selector to retrieve just the key of current entity
- **util:** Added utility functions to retrieve entity key from decorated models
