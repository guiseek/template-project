import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UiNavModule } from '@guiseek/ui/nav';
import { UiSharedModule } from '@guiseek/ui/shared';

import { AuthCustomerModule } from './auth-customer/auth-customer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthCustomerGuard } from './auth-customer/services/auth-customer.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    UiSharedModule,
    UiNavModule.forRoot([
      {
        name: 'Home',
        icon: 'home',
        link: '/'
      },
      {
        name: 'Login',
        icon: 'person',
        link: '/auth'
      },
      {
        name: 'Account',
        icon: 'account_circle',
        link: '/account'
      },
      {
        name: 'Grid',
        icon: 'insert_chart',
        disabled: false,
        children: [
          {
            name: 'CRUD Table',
            icon: 'web_aaset',
            link: '/dashboard/grid/crud-table'
          },
          {
            name: 'Grid List',
            icon: 'grid_on',
            link: '/dashboard/grid/grid-list'
          }
        ]
      }
    ]),
    RouterModule.forRoot(
      [
        // { path: '', redirectTo: 'account', pathMatch: 'full' },
        {
          path: 'account',
          // canActivate: [AuthCustomerGuard],
          loadChildren: () =>
            import('./account/account.module').then(m => m.AccountModule)
        }
      ],
      { initialNavigation: 'enabled' }
    ),
    AuthCustomerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
