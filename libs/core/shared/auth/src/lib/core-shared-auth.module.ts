import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiSharedModule } from '@guiseek/ui/shared';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const components = [
  LoginComponent,
  ProfileComponent,
  ChangePasswordComponent,
  SignupComponent,
  ForgotPasswordComponent
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiSharedModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [...components],
  entryComponents: [ForgotPasswordComponent, ChangePasswordComponent],
  exports: [...components]
})
export class CoreSharedAuthModule {}

// constructor(@Optional() @SkipSelf() parentModule: CoreSharedAuthModule) {
//   if (parentModule) {
//     throw new Error(
//       'CoreSharedAuthModule is already loaded. Import it in the AppModule only'
//     );
//   }
// }
// static forRoot({
//   jwtConfig,
//   ...config
// }: CoreAuthConfig): ModuleWithProviders {
//   return {
//     ngModule: CoreSharedAuthModule,
//     providers: [
//       CoreAuthService,
//       {
//         provide: CORE_AUTH_CONFIG_TOKEN,
//         useValue: { ...CORE_AUTH_CONFIG, ...config }
//       },
//       {
//         provide: CORE_JWT_CONFIG_TOKEN,
//         useValue: { ...CORE_JWT_CONFIG, ...jwtConfig }
//       },
//       ...CoreWebProviders,
//       CoreTokenService,
//       TokenInterceptor,
//       CoreAuthService,
//       CoreAuthGuard,
//       {
//         provide: APP_INITIALIZER,
//         useFactory: tokenServiceInitializeApp,
//         multi: true,
//         deps: [CoreTokenService]
//       },
//       {
//         provide: HTTP_INTERCEPTORS,
//         useExisting: TokenInterceptor,
//         multi: true
//       },
//       {
//         provide: APP_INITIALIZER,
//         useFactory: authServiceInitializeApp,
//         multi: true,
//         deps: [CoreAuthService]
//       },
//     ]
//   };
// }
