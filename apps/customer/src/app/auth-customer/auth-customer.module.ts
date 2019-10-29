import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSharedModule } from '@guiseek/ui/shared';
import { AuthCustomerRoutingModule } from './auth-customer-routing.module';
import { CoreSharedAuthModule } from '@guiseek/core/shared/auth';
import { AuthCustomerService } from './services/auth-customer.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiSharedModule,
    HttpClientModule,
    AuthCustomerRoutingModule
  ],
  providers: [
    AuthCustomerService
  ]
})
export class AuthCustomerModule { }
