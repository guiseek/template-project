import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UiSharedModule } from '@guiseek/ui/shared';
import { UiUploaderModule } from '@guiseek/ui/uploader';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreSharedAuthModule } from '@guiseek/core/shared/auth';
import { HttpTokenInterceptor, AuthGuard, UserAccountResolver } from '@guiseek/core/shared/security';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiNavModule } from '@guiseek/ui/nav';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';

const appRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    data: {
      breadcrumb: 'Conta'
    },
    children: [
      {
        path: '',
        component: ProfileComponent,
        data: {
          breadcrumb: 'Perfil'
        },
        resolve: {
          userAccount: UserAccountResolver
        }
      },
      {
        path: 'dashboard',
        data: {
          breadcrumb: 'Dashboard'
        },
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(
          (m) => m.DashboardModule
        )
      }
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiSharedModule,
    UiUploaderModule,
    FlexLayoutModule,
    CoreSharedAuthModule,
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
        name: 'Dashboard',
        icon: 'insert_chart',
        disabled: false,
        children: [
          {
            name: 'Cartões',
            icon: 'web_aaset',
            link: '/account/dashboard'
          },
          {
            name: 'Lista em grade',
            icon: 'grid_on',
            link: '/account/dashboard/grid'
          }
        ]
      }
    ]),
    RouterModule.forChild(appRoutes),
    // DashboardModule
  ],
  declarations: [MainComponent, ProfileComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ]
})
export class CustomerLazyAccountModule { }
