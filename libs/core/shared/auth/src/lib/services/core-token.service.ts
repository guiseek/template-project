import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { decode } from 'jsonwebtoken';
import { CORE_JWT_CONFIG_TOKEN } from '../config/jwt.config';
import { BROWSER_STORAGE_CONFIG_TOKEN, BrowserStorageService } from '@guiseek/core/shared/web';
import { JwtConfig } from '../interfaces';
import { Observable } from 'rxjs';

export function tokenServiceInitializeApp(tokenService: CoreTokenService) {
  return () => tokenService.initializeApp();
}
@Injectable({
  providedIn: 'root'
})
export class CoreTokenService {
  current: string = undefined;
  current$: Observable<string>;

  tokenHasExpired: boolean | undefined = undefined;
  tokenHasExpired$: Observable<boolean | undefined>;

  private _checkTokenHasExpiredIntervalRef;

  constructor(
    @Inject(CORE_JWT_CONFIG_TOKEN) private _jwtConfig: JwtConfig,
    @Inject(BROWSER_STORAGE_CONFIG_TOKEN) private _storage: BrowserStorageService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    console.log('jwt: ', _jwtConfig);
    console.log('storage: ', _storage);
    console.log('jwt: ', _platformId);
  }
  initCurrent() {
    console.log('token: ', )
    return new Promise((resolve, reject) => {
      this._storage
        .getItem(this._jwtConfig.storageKeyName)
        .then((data: string) => {
          if (data && data !== 'undefined') {
            resolve(data);
          } else {
            resolve(this.getCurrent());
          }
        });
    });
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initCurrent().then(value => {
        this.setCurrent(value as string);
        resolve();
      });
    });
  }
  getCurrent() {
    return this.current;
  }
  setCurrent(value: string) {
    if (!value) {
      this._storage
        .removeItem(this._jwtConfig.storageKeyName)
        .then(_ => (this.current = undefined));
    } else {
      this._storage
        .setItem(this._jwtConfig.storageKeyName, value)
        .then(_ => (this.current = value));
    }
    if (!isPlatformServer(this._platformId)) {
      if (value) {
        try {
          const tokenPayload = this.getTokenData(value).payload;
          if (this._checkTokenHasExpiredIntervalRef) {
            clearInterval(this._checkTokenHasExpiredIntervalRef);
          }
          this._checkTokenHasExpiredIntervalRef = setInterval(_ => {
            clearInterval(this._checkTokenHasExpiredIntervalRef);
            this.tokenHasExpired = true;
          }, (tokenPayload.exp - tokenPayload.iat) * 1000);
        } catch (error) { }
      } else {
        if (this._checkTokenHasExpiredIntervalRef) {
          clearInterval(this._checkTokenHasExpiredIntervalRef);
        }
      }
    }
  }
  getTokenData(token: string): { payload: { iat: number; exp: number } } {
    return decode(token, { complete: true }) as any;
  }
  getToken() {
    return this._storage.getItem(this._jwtConfig.tokenName)
  }
  getHeader() {
    const headers = {};
    headers[this._jwtConfig.headerName] =
      this._jwtConfig.headerPrefix + ' ' + this.getCurrent();
    console.log('headers: ', headers)
    return headers;
  }
}
