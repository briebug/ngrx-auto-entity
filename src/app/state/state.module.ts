import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DefaultEffects, EntityOperators } from 'ngrx-auto-entity';
import { CustomerEffects } from 'state/customer/customer.effects';
import { environment } from '../../environments/environment';
import { appMetaReducers, appReducer } from './app.reducer';
import { RouterEffects } from './router/router.effects';
import { CustomRouterStateSerializer } from './shared/utils';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    EffectsModule.forRoot([DefaultEffects, CustomerEffects, RouterEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    })
  ],
  declarations: [],
  providers: [EntityOperators]
})
export class StateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomRouterStateSerializer
        }
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: StateModule
  ) {
    if (parentModule) {
      throw new Error('StateModule is already loaded. Import it in the AppModule only');
    }
  }
}
