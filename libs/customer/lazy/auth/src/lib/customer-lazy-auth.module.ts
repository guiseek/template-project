import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { AuthLoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {
  CoreSharedAuthModule,
  CoreAuthService
} from '@guiseek/core/shared/auth';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    // CoreSharedAuthModule.forRoot({
    //   endpoint: '/api/auth',
    //   redirect: {
    //     success: '/account',
    //     failure: '/auth'
    //   }
    // }),
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
        children: [
          {
            path: '',
            component: AuthLoginComponent
          },
          {
            path: 'signup',
            component: SignupComponent
          }
        ]
      }
    ])
  ],
  // providers: [CoreAuthService],
  declarations: [LoginComponent, AuthLoginComponent, SignupComponent]
})
export class CustomerLazyAuthModule { }
