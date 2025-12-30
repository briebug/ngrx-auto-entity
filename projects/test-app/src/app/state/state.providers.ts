import { inject, makeEnvironmentProviders } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, RouterStateSerializer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideAutoEntityStore } from '@briebug/ngrx-auto-entity';
import { provideAutoEntityService } from '@briebug/ngrx-auto-entity-service';
import { ConfigService } from '../services/config.service';
import { provideAccountState } from './account';
import { provideCustomerState } from './customer';
import { CustomRouterStateSerializer } from './shared/utils';
import { appMetaReducers, appReducer } from './app.state';

export function provideAppState() {
  return makeEnvironmentProviders([
    provideStore(appReducer, {
      metaReducers: appMetaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionSerializability: false
      }
    }),
    provideStoreDevtools({
      connectInZone: true
    }),
    provideRouterStore(),
    provideEffects(),
    provideAutoEntityStore(),
    provideAutoEntityService(() => {
      const configService = inject(ConfigService);
      return {
        urlPrefix: (operation, info, criteria) => configService.apiBaseUrl
      };
    }),
    provideAccountState(),
    provideCustomerState(),
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ]);
}
