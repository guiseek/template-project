import { BROWSER_STORAGE_CONFIG_TOKEN } from './config/browser-storage.config';
import { BrowserStorageService } from './services/browser-storage.service';
import { Provider } from '@angular/core';
import { CookieService } from './services/cookie.service';

export * from './services/browser-storage.service';
export * from './services/cookie.service';
export * from './config/browser-storage.config';

export const CoreWebProviders: Provider[] = [
  CookieService,
  { provide: BROWSER_STORAGE_CONFIG_TOKEN, useClass: BrowserStorageService }
];
