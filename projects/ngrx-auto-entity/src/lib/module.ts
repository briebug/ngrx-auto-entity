import { NgModule } from '@angular/core';

import { EntityOperators } from './operators';
import { NgrxAutoEntityService } from './service';

@NgModule({ providers: [NgrxAutoEntityService, EntityOperators] })
export class NgrxAutoEntityModule {}
