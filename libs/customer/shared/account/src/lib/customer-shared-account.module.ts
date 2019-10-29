import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomerAccountGuard } from './guards/customer-account.guard';
import { CustomerAccountService } from './services/customer-account.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
    // CoreSharedAuthModule.forRoot({})
  ],
  providers: [
    // CoreAuthService,
    CustomerAccountGuard,
    CustomerAccountService
  ]
})
export class CustomerSharedAccountModule {}
