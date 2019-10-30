import { InjectionToken } from '@angular/core';
import { CoreFireConfig } from '../interfaces/fire-config.interface';

export const FIRE_CONFIG = new InjectionToken<CoreFireConfig>(
  'core.fire.config'
);
