import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UiSharedModule } from '@guiseek/ui/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreSharedSecurityModule, AuthGuard, HttpTokenInterceptor } from '@guiseek/core/shared/security';
// import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiNavModule } from '@guiseek/ui/nav';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { CoreSharedAuthModule } from '@guiseek/core/shared/auth';
// import { CoreSharedAuthModule, CoreAuthGuard, TokenInterceptor } from '@guiseek/core/shared/auth';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // HttpClientModule,
    // CoreSharedSecurityModule,
    UiSharedModule,
    FlexLayoutModule,
    // CoreSharedAuthModule.forRoot({
    //   endpoint: '/api/auth',
    //   redirect: {
    //     success: '/account',
    //     failure: '/auth'
    //   }
    // }),
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
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        // canActivate: [AuthGuard],
        component: MainComponent
      }
    ])
  ],
  declarations: [MainComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ]
})
export class CustomerLazyAccountModule { }
