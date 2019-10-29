import { NgModule, ModuleWithProviders, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginBaseComponent } from './components/login/login.component';
import {
  CORE_AUTH_CONFIG_TOKEN,
  CORE_AUTH_CONFIG
} from './config/core-auth.config';
import { CORE_JWT_CONFIG_TOKEN, CORE_JWT_CONFIG } from './config/jwt.config';
import { CoreAuthConfig } from './interfaces/core-auth-config.interface';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UiSharedModule } from '@guiseek/ui/shared';
import {
  CoreAuthService,
  authServiceInitializeApp
} from './services/core-auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreWebProviders } from '@guiseek/core/shared/web';
import {
  CoreTokenService,
  tokenServiceInitializeApp
} from './services/core-token.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CoreAuthGuard } from './guards/core-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    UiSharedModule,
    RouterModule
  ],
  providers: [
    CoreAuthService,
    CoreAuthGuard
  ],
  declarations: [LoginBaseComponent, ProfileComponent, ChangePasswordComponent],
  exports: [LoginBaseComponent, ProfileComponent, ChangePasswordComponent]
})
export class CoreSharedAuthModule {
  // constructor(@Optional() @SkipSelf() parentModule: CoreSharedAuthModule) {
  //   if (parentModule) {
  //     throw new Error(
  //       'CoreSharedAuthModule is already loaded. Import it in the AppModule only'
  //     );
  //   }
  // }
  static forRoot({
    jwtConfig,
    ...config
  }: CoreAuthConfig): ModuleWithProviders {
    return {
      ngModule: CoreSharedAuthModule,
      providers: [
        CoreAuthService,
        {
          provide: CORE_AUTH_CONFIG_TOKEN,
          useValue: { ...CORE_AUTH_CONFIG, ...config }
        },
        {
          provide: CORE_JWT_CONFIG_TOKEN,
          useValue: { ...CORE_JWT_CONFIG, ...jwtConfig }
        },
        ...CoreWebProviders,
        CoreTokenService,
        TokenInterceptor,
        CoreAuthService,
        CoreAuthGuard,
        {
          provide: APP_INITIALIZER,
          useFactory: tokenServiceInitializeApp,
          multi: true,
          deps: [CoreTokenService]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: TokenInterceptor,
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: authServiceInitializeApp,
          multi: true,
          deps: [CoreAuthService]
        },
      ]
    };
  }

}
