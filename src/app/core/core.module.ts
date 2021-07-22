import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
  declarations: [ShellComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule?: CoreModule
  ) {
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import core module in the AppModule only.`);
    }
  }
}
