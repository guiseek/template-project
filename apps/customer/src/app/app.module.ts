import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

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
          path: 'account',
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
