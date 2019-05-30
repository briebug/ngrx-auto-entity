import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { Route } from './core/services/route.service';

const routes: Routes = [
  Route.withShell([
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: 'customers',
      loadChildren: './+customers/customers.module#CustomersModule'
    },
    {
      path: 'products',
      loadChildren: './+products/products.module#ProductsModule'
    },
    {
      path: 'home',
      component: HomeComponent
    }
  ]),
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
