import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { OrderComponent } from './components/order/order.component';
import { OrderItem } from './models/orderItem.model';
import { routes } from './orders.routing';
import { FeatureEntityService } from './services/FeatureEntityService';
import { featureReducer } from './state/feature.reducer';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('orders', featureReducer),
    NgrxAutoEntityModule.forFeature()
  ],
  providers: [{ provide: OrderItem, useClass: FeatureEntityService }]
})
export class OrdersModule {}
