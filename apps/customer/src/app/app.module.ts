import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CoreSharedSecurityModule,
  AuthGuard,
  HttpTokenInterceptor
} from '@guiseek/core/shared/security';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreSharedSecurityModule.forRoot({
      api: { prefix: '/api', login: '/auth/login', me: '/auth/me' },
      auth: {
        login: { path: '/auth/login', redirectTo: '/' },
        signup: { path: '/auth/signup', redirectTo: '/auth/login' },
        logout: { redirectTo: '/auth/login' }
      }
    }),
    RouterModule.forRoot(
      [
        // { path: '', redirectTo: 'account', pathMatch: 'full' },
        {
          path: 'auth',
          loadChildren: () =>
            import('@guiseek/customer/lazy/auth').then(
              m => m.CustomerLazyAuthModule
            )
        },
        {
          path: 'account',
          canActivate: [AuthGuard],
          loadChildren: () =>
            import('@guiseek/customer/lazy/account').then(
              module => module.CustomerLazyAccountModule
            )
        },
        { path: '', redirectTo: 'account', pathMatch: 'full' },
      ],
      { initialNavigation: 'enabled' }
    ),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
