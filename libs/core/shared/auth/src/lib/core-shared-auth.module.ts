import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginBaseComponent } from './components/login/login.component';
import { CORE_AUTH_CONFIG_TOKEN, CORE_AUTH_CONFIG } from './config/core-auth.config';
import { CoreAuthConfig } from './interfaces/core-auth-config.interface';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LoginBaseComponent],
  exports: [LoginBaseComponent]
})
export class CoreSharedAuthModule {
  static forRoot(config: CoreAuthConfig): ModuleWithProviders {
    return {
      ngModule: CoreSharedAuthModule,
      providers: [{
        provide: CORE_AUTH_CONFIG_TOKEN,
        useValue: {
          ...CORE_AUTH_CONFIG,
          ...config
        }
      }]
    }
  }
}
