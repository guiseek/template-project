import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerLoginComponent } from './components/login/login.component';
import { CustomerSignupComponent } from './components/signup/signup.component';
import { CoreSharedAuthModule } from '@guiseek/core/shared/auth';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CoreSharedAuthModule,
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
        // pathMatch: 'full',
        component: AuthContainerComponent,
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
          },
          {
            path: 'login',
            component: CustomerLoginComponent
          },
          {
            path: 'signup',
            component: CustomerSignupComponent
          }
        ]
      }
    ])
  ],
  // providers: [CoreAuthService],
  declarations: [
    CustomerLoginComponent,
    CustomerSignupComponent,
    AuthContainerComponent
  ]
})
export class CustomerLazyAuthModule {}
