import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreSecurityConfig } from './interfaces/security-config.interface';
import { AuthenticationService } from './services/authentication.service';
import { SECURITY_CONFIG } from './config/security-config.token';
import { TokenService } from './services/token.service';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { UserAccountResolver } from './resolvers/user-account.resolver';
import { UserAccountService } from './services/user-account.service';

@NgModule({
  imports: [CommonModule]
})
export class CoreSharedSecurityModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreSharedSecurityModule) {
    return new Error(
      'CoreSharedSecurityModule só pode ser carregado uma única vez.'
    );
  }
  static forRoot(config: CoreSecurityConfig): ModuleWithProviders {
    return {
      ngModule: CoreSharedSecurityModule,
      providers: [
        { provide: SECURITY_CONFIG, useValue: config },
        AuthenticationService,
        TokenService,
        HttpTokenInterceptor,
        UserAccountService,
        UserAccountResolver
      ]
    };
  }
}
