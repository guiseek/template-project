import { InjectionToken } from '@angular/core';
import { CoreAuthConfig } from '../interfaces/core-auth-config.interface';

export const CORE_AUTH_CONFIG: CoreAuthConfig = {
  endpoint: '/api/auth',
  redirect: {
    success: '/',
    failure: '/'
  },
  title: 'Auth'
}

export const CORE_AUTH_CONFIG_TOKEN = new InjectionToken<CoreAuthConfig>('core-auth.config');
