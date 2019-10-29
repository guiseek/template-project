import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreSharedSecurityModule, AuthGuard } from '@guiseek/core/shared/security';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreSharedSecurityModule.forRoot({
      api: {
        prefix: '/api',
        login: '/auth/login'
      },
      auth: {
        login: {
          path: '/auth'
        },
        signup: {
          path: '/auth/signup'
        }
      }
    }),
    RouterModule.forRoot(
      [
        // { path: '', redirectTo: 'account', pathMatch: 'full' },
        {
          path: 'auth',
          // canActivate: [AuthCustomerGuard],
          loadChildren: () =>
            import('@guiseek/customer/lazy/auth').then(
              m => m.CustomerLazyAuthModule
            )
        },
        {
          path: '',
          canActivate: [AuthGuard],
          loadChildren: () =>
            import('@guiseek/customer/lazy/account').then(
              module => module.CustomerLazyAccountModule
            )
        },
        // { path: '', redirectTo: 'account', pathMatch: 'full' },
      ],
      { initialNavigation: 'enabled' }
    ),
    // CoreSharedAuthModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
