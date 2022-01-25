import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { featureReducer } from './feature.state';

@NgModule({
  imports: [StoreModule.forFeature('feature', featureReducer)]
})
export class FeatureModule {}
