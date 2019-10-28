import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UiNavModule } from '@guiseek/ui/nav';
import { AuthCustomerModule } from './auth-customer/auth-customer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    UiNavModule.forRoot([
      {
        name: 'Home',
        icon: 'home',
        link: '/home'
      },
      {
        name: 'Dashboard',
        icon: 'dashboard',
        link: '/dashboard'
      },
      {
        name: 'Admin',
        icon: 'security',
        link: '/admin'
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
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    AuthCustomerModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
