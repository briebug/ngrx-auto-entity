import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  InjectionToken,
  Injector,
  makeEnvironmentProviders,
  Provider,
  ProviderToken,
  Type
} from '@angular/core';
import { META_REDUCERS, Store } from '@ngrx/store';
import { EffectSources } from '@ngrx/effects';

import { EntityEffects } from './effects/effects-all';
import { ExtraEffects } from './effects/effects-extra';
import { EntityIfNecessaryOperators } from './effects/if-necessary-operators';
import { EntityOperators } from './effects/operators';
import { autoEntityMetaReducer } from './reducer/meta-reducer';
import { NgrxAutoEntityService } from './service/service';
import { addInjector } from './service/service-injection';
import { NGRX_AUTO_ENTITY_APP_STORE } from './effects/if-necessary-operator-utils';
import { noop } from 'rxjs';

declare const ngDevMode: unknown;

/** @internal */
export function _assertProvider(token: ProviderToken<unknown>, message: string): void {
  if (inject(token, { optional: true }) == null) {
    console.error(message);
  }
}

/** @internal */
export function _assertStoreProvided(): () => void {
  _assertProvider(Store, "[NGRX-AE] ! No provider for Store. Make sure `provideStore()` is included in you application's providers.");
  return noop;
}

/** @internal */
export function _assertEffectSourcesProvided(): () => void {
  _assertProvider(
    EffectSources,
    "[NGRX-AE] ! No provider for EffectSources. Make sure `provideEffects()` is included in you application's providers."
  );
  return noop;
}

export interface NgRxAutoEntityFeature<FeatureKind extends NgRxAutoEntityFeatureKind> {
  ɵkind: FeatureKind;
  ɵproviders: Provider[];
}

/** @internal */
export function _isAutoEntityFeature<FeatureKind extends NgRxAutoEntityFeatureKind>(
  value: any
): value is NgRxAutoEntityFeature<FeatureKind> {
  return value && value.ɵkind != null && value.ɵproviders != null;
}

/** @internal */
export function _includesFeature<FeatureKind extends NgRxAutoEntityFeatureKind>(
  features: NgRxAutoEntityFeatures[],
  featureKind: FeatureKind
): boolean {
  return features.some(feature => feature.ɵkind === featureKind);
}

/** @internal */
export function _autoEntityFeature<FeatureKind extends NgRxAutoEntityFeatureKind>(
  kind: FeatureKind,
  providers: Provider[]
): NgRxAutoEntityFeature<FeatureKind> {
  return { ɵkind: kind, ɵproviders: providers };
}

export function getNgRxAutoEntityMetaReducer() {
  return autoEntityMetaReducer;
}

/** @internal */
export function _provideAutoEntityStore(features: NgRxAutoEntityFeatures[] = []): Provider[] {
  const providers: Provider[] = [];

  if (!_includesFeature(features, NgRxAutoEntityFeatureKind.EntityEffectsFeature)) {
    features.push(_withEntityEffects());
  }

  if (!_includesFeature(features, NgRxAutoEntityFeatureKind.ExtraEffectsFeature)) {
    features.push(_withExtraEffects());
  }

  if (!_includesFeature(features, NgRxAutoEntityFeatureKind.CustomStoreFeature)) {
    providers.push({
      provide: NGRX_AUTO_ENTITY_APP_STORE,
      useFactory: () => inject(Store)
    });
  }

  if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    providers.push({
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: _assertStoreProvided,
      multi: true
    });
  }

  return [
    NgrxAutoEntityService,
    EntityOperators,
    EntityIfNecessaryOperators,
    { provide: META_REDUCERS, useFactory: getNgRxAutoEntityMetaReducer, multi: true },
    ...providers,
    ...features.map(feature => feature.ɵproviders)
  ];
}

/**
 * Provides the global Auto-Entity providers.
 *
 * @remarks
 * ### Providing Auto-Entity
 *
 * ```
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideStore(appReducer)
 *     provideAutoEntityStore(),
 *   ]
 * })
 * ```
 *
 * @param features - A list of Auto-Entity features to include.
 * @returns A set of providers to set up the Auto-Entity global state.
 */
export function provideAutoEntityStore(...features: NgRxAutoEntityFeatures[]): EnvironmentProviders {
  return makeEnvironmentProviders(_provideAutoEntityStore(features));
}

let INJECTOR_DEPTH = 0;

/** @internal */
export function _resetInjectorDepth() {
  INJECTOR_DEPTH = 0;
}

export function addNgRxAutoEntityInjector() {
  const injector = inject(Injector);

  // Update the core NgRxAutoEntityService INJECTORS to include the current injector
  // This creates a list of injectors that should eventually encompass the entire application
  // as +feature loaded modules are subsequently created, to be evaluated in reverse order
  INJECTOR_DEPTH = INJECTOR_DEPTH + 1;
  addInjector(
    Injector.create({
      providers: [],
      parent: injector,
      name: 'AutoEntityInjector' + INJECTOR_DEPTH
    })
  );
}

/** @internal */
export function _provideAutoEntityState(): Provider[] {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: addNgRxAutoEntityInjector
    }
  ];
}

/**
 * Provides the feature level Auto-Entity providers.
 *
 * @remarks
 * ### Providing an Auto-Entity Feature State
 *
 * ```
 * provideState(featureState),
 * provideAutoEntityState()
 * ```
 *
 * @returns A set of providers to set up an Auto-Entity feature state.
 */
export function provideAutoEntityState(): EnvironmentProviders {
  return makeEnvironmentProviders(_provideAutoEntityState());
}

let PROVIDED_SERVICES: Type<any>[] = [];

/** @internal */
export function _resetProvidedServices() {
  PROVIDED_SERVICES = [];
}

/**
 * Provides an entity's service.
 *
 * This will reuse existing services when possible.
 *
 * @remarks
 * ### Providing an Entity's Service
 *
 * ```
 * provideEntityService(Products, ProductsService)
 * ```
 *
 * @param modelType - The entity model to provide a service for.
 * @param service - The service to provide.
 * @returns A set of providers to set up an entity's service.
 */
export function provideEntityService(modelType: Type<any>, service: Type<any>): EnvironmentProviders {
  const providers: Provider[] = [{ provide: modelType, useExisting: service }];

  if (!PROVIDED_SERVICES.includes(service)) {
    providers.unshift(service);
    PROVIDED_SERVICES.push(service);
  }

  return makeEnvironmentProviders(providers);
}

export type CustomStoreFeature = NgRxAutoEntityFeature<NgRxAutoEntityFeatureKind.CustomStoreFeature>;

/**
 * Customize the provided Auto-Entity Store.
 * @param storeProvider - The token to use when injecting the store.
 */
export function withCustomStore(storeProvider: Type<Store> | InjectionToken<Store>): CustomStoreFeature {
  const providers = [{ provide: NGRX_AUTO_ENTITY_APP_STORE, useExisting: storeProvider }];
  return _autoEntityFeature(NgRxAutoEntityFeatureKind.CustomStoreFeature, providers);
}

/**
 * Disables automatic providing of the Auto-Entity Store.
 * @internal
 */
export function _withoutCustomStore(): CustomStoreFeature {
  return _autoEntityFeature(NgRxAutoEntityFeatureKind.CustomStoreFeature, []);
}

export type EntityEffectsFeature = NgRxAutoEntityFeature<NgRxAutoEntityFeatureKind.EntityEffectsFeature>;

function addNgRxAutoEntityEntityEffects(): void {
  const effectSources = inject(EffectSources);
  const entityEffects = inject(EntityEffects);
  // WARNING: `addEffects` is an undocumented API.
  effectSources.addEffects(entityEffects);
}

/** @internal */
export function _withEntityEffects(): EntityEffectsFeature {
  const providers: Provider[] = [
    EntityEffects,
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: addNgRxAutoEntityEntityEffects,
      multi: true
    }
  ];

  if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    providers.push({
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: _assertEffectSourcesProvided,
      multi: true
    });
  }

  return _autoEntityFeature(NgRxAutoEntityFeatureKind.EntityEffectsFeature, providers);
}

/**
 * Prevent Auto-Entity from registering its entity effects.
 */
export function withoutEntityEffects(): EntityEffectsFeature {
  return _autoEntityFeature(NgRxAutoEntityFeatureKind.EntityEffectsFeature, []);
}

export type ExtraEffectsFeature = NgRxAutoEntityFeature<NgRxAutoEntityFeatureKind.ExtraEffectsFeature>;

function addNgRxAutoEntityExtraEffects(): void {
  const effectSources = inject(EffectSources);
  const extraEffects = inject(ExtraEffects);
  // WARNING: `addEffects` is an undocumented API.
  effectSources.addEffects(extraEffects);
}

/** @internal */
export function _withExtraEffects(): ExtraEffectsFeature {
  const providers = [
    ExtraEffects,
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: addNgRxAutoEntityExtraEffects,
      multi: true
    }
  ];
  return _autoEntityFeature(NgRxAutoEntityFeatureKind.ExtraEffectsFeature, providers);
}

/**
 * Prevent Auto-Entity from registering its extra effects.
 *
 * This includes all select, deselect, and edit effects.
 */
export function withoutExtraEffects(): ExtraEffectsFeature {
  return _autoEntityFeature(NgRxAutoEntityFeatureKind.ExtraEffectsFeature, []);
}

export type NgRxAutoEntityFeatures = CustomStoreFeature | EntityEffectsFeature | ExtraEffectsFeature;

export const enum NgRxAutoEntityFeatureKind {
  CustomStoreFeature,
  EntityEffectsFeature,
  ExtraEffectsFeature
}
