import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SECURITY_CONFIG } from '../config/security-config.token';
import { CoreSecurityConfig } from '../interfaces/security-config.interface';
import { UserAccount } from '@guiseek/core/shared/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable(
  // { providedIn: 'root' }
)
export class AuthenticationService {
  isLoggedIn = false;
  redirectUrl: string;
  $user = new BehaviorSubject<UserAccount>(null);
  user$ = this.$user.asObservable();
  constructor(
    @Inject(SECURITY_CONFIG) public config: CoreSecurityConfig,
    private _http: HttpClient
  ) {
    console.log(config)
  }
  login(data) {
    return this._http.post<UserAccount>(
      this.config.api.prefix + this.config.api.login, data
    ).pipe(
      tap((auth) => {
        this.isLoggedIn = !!auth
        this.$user.next(auth)
      }))
  }
}
