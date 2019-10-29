import { NgModule, Optional, SkipSelf, ModuleWithProviders, ModuleWithComponentFactories } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreSecurityConfig } from './interfaces/security-config.interface';
import { AuthenticationService } from './services/authentication.service';
import { SECURITY_CONFIG } from './config/security-config.token';

@NgModule({
  imports: [CommonModule]
})
export class CoreSharedSecurityModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreSharedSecurityModule
  ) {
    console.log(parentModule)
    return new Error(
      'CoreSharedSecurityModule só pode ser carregado uma única vez.'
    )
  }
  static forRoot(config: CoreSecurityConfig): ModuleWithProviders {
    return {
      ngModule: CoreSharedSecurityModule,
      providers: [
        { provide: SECURITY_CONFIG, useValue: config },
        AuthenticationService
      ]
    }
  }
}
