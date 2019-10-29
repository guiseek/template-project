import { InjectionToken } from '@angular/core';
import { BrowserStorage } from '../interfaces/browser-storage.interface';

export const BROWSER_STORAGE_CONFIG_TOKEN: InjectionToken<
  BrowserStorage
> = new InjectionToken<BrowserStorage>('BrowserStorageConfig');
