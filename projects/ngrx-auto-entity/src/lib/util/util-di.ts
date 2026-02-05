import { InjectionToken } from '@angular/core';

/** @internal */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NAE_UNDEFINED = new InjectionToken<any>('@briebug/ngrx-auto-entity Undefined', {
  factory: () => undefined
});
