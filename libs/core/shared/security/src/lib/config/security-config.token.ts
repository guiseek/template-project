import { InjectionToken } from '@angular/core';
import { CoreSecurityConfig } from '../interfaces/security-config.interface';

export const SECURITY_CONFIG = new InjectionToken<CoreSecurityConfig>(
  'core.security.config'
);
