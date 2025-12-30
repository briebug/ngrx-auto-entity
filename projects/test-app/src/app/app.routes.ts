import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./+feature/feature.routes').then(m => m.routes)
  }
];
