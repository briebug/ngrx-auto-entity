import { Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { provideFeatureState } from './state/feature.state';

export const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    providers: [provideFeatureState()]
  }
];
