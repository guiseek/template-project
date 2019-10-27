import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthCustomerModule } from './auth-customer/auth-customer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    AuthCustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
