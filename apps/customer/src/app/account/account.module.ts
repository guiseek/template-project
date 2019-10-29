import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { UiSharedModule } from '@guiseek/ui/shared';
import { CoreSharedAuthModule, TokenInterceptor } from '@guiseek/core/shared/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: AccountComponent }
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    UiSharedModule,
    FlexLayoutModule,
    CoreSharedAuthModule.forRoot({}),
    AccountRoutingModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: TokenInterceptor,
      multi: true
    }
  ]
})
export class AccountModule { }
