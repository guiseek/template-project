import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreFireConfig } from './interfaces/fire-config.interface';
import { FIRE_CONFIG } from './config/fire-config.token';
import { FireQueryService } from './services/fire-query.service';
import { FireAuthService } from './services/fire-auth.service';
import { FirestoreService } from './services/firestore.service';

@NgModule({
  imports: [CommonModule]
})
export class CoreSharedFireModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreSharedFireModule) {
    console.log(parentModule);
    return new Error(
      'CoreSharedFireModule só pode ser carregado uma única vez.'
    );
  }
  static forRoot(config: CoreFireConfig): ModuleWithProviders {
    return {
      ngModule: CoreSharedFireModule,
      providers: [
        { provide: FIRE_CONFIG, useValue: config },
        FireQueryService,
        FireAuthService,
        FirestoreService
      ]
    };
  }
}
