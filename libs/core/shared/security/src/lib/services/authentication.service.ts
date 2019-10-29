import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SECURITY_CONFIG } from '../config/security-config.token';
import { CoreSecurityConfig } from '../interfaces/security-config.interface';
import { UserAccount, JwtPayload } from '@guiseek/core/shared/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable(
  // { providedIn: 'root' }
)
export class AuthenticationService {
  isLoggedIn = false;
  redirectUrl: string;
  serverMessage: string;
  $user = new BehaviorSubject<UserAccount>(null);
  user$ = this.$user.asObservable();
  constructor(
    @Inject(SECURITY_CONFIG) public config: CoreSecurityConfig,
    private _tokenService: TokenService,
    private router: Router,
    private _http: HttpClient
  ) {
    console.log(config)
  }
  login(data) {
    const login$ = this._http.post<JwtPayload>(
      this.config.api.prefix + this.config.api.login, data
    ).pipe(
      tap(auth => this.isLoggedIn = !!auth)
    )
    login$.subscribe(
      (auth) => this.onLogin(auth),
      ({ error }) => this.onError(error)
    )
    return login$;
  }
  onLogin({ token, user }) {
    console.log(token)
    this._tokenService.token = token.accessToken
    this.router.navigate([
      this.redirectUrl ? this.redirectUrl :
      this.config.auth.login.redirectTo
    ]);
    this.$user.next(user)
  }
  onError(err) {
    console.log(err)
    this.serverMessage = err.message
  }
  validate() {
    return this._http.get(
      this.config.api.prefix + this.config.api.me
    )
  }
}
