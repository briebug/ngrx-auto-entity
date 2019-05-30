import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductComponent } from './containers/product/product.component';
import { ProductsComponent } from './containers/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, FlexLayoutModule, FormsModule, MaterialModule, ReactiveFormsModule],
  declarations: [ProductComponent, ProductsComponent, ProductFormComponent, ProductsTableComponent]
})
export class ProductsModule {}
