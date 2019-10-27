import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './containers/login/login.component';
import { AuthLoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
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
  declarations: [LoginComponent, AuthLoginComponent, SignupComponent]
})
export class CustomerLazyAuthModule { }
