import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpClientModule } from '@angular/common/http';
import { UiSharedModule } from '@guiseek/ui/shared';

import { LoginComponent } from './containers/login/login.component';
import { AuthLoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoreSharedAuthModule, CoreAuthService } from '@guiseek/core/shared/auth';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiSharedModule,
    FlexLayoutModule,
    CoreSharedAuthModule.forRoot({
      endpoint: '/api/auth',
      redirect: {
        success: '/',
        failure: '/auth'
      }
    }),
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
        children: [
          {
            path: '',
            component: AuthLoginComponent,
          },
          {
            path: 'signup',
            component: SignupComponent,
          }
        ]
      }
    ])
  ],
  providers: [
    CoreAuthService
  ],
  declarations: [LoginComponent, AuthLoginComponent, SignupComponent]
})
export class CustomerLazyAuthModule { }
