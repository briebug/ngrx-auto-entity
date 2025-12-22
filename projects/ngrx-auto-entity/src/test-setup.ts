import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true
});

import * as jestExtendedMatchers from 'jest-extended';
expect.extend(jestExtendedMatchers);
