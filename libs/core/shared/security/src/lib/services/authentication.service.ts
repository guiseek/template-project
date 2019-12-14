import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SECURITY_CONFIG } from '../config/security-config.token';
import { CoreSecurityConfig } from '../interfaces/security-config.interface';
import { UserAccount, JwtPayload } from '../interfaces';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, take, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
// { providedIn: 'root' }
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
  }
  login(data) {
    console.log(this.config.api.prefix + this.config.api.login, data)
    const login$ = this._http
      .post<JwtPayload>(this.config.api.prefix + this.config.api.login, data)
      .pipe(tap(auth => (this.isLoggedIn = !!auth)));
    login$.subscribe(
      (auth) => this.onLoginSuccess(auth),
      (error) => this.onLoginFailure(error)
    );
    return login$;
  }
  onLoginSuccess({ token, user }) {
    console.log(token, user)
    this._tokenService.token = token.accessToken;
    this.router.navigate([
      this.redirectUrl ? this.redirectUrl : this.config.auth.login.redirectTo
    ]);
    this.$user.next(user);
  }
  onLoginFailure(err) {
    console.log(err)
    this.serverMessage = err && err.message;
    return throwError(err)
  }
  signUp(data: UserAccount) {
    return this._http.post<UserAccount>(
      this.config.api.prefix + this.config.api.signup, data
    ).pipe(
      take(1),
      catchError(this.onSignUpFailure.bind(this)),
      tap(this.onSignUpSuccess.bind(this))
    )
  }
  onSignUpSuccess = (user) => {
    console.log('user: ', user)
    // this._tokenService.token = token.accessToken;
    this.router.navigate([
      this.redirectUrl ? this.redirectUrl : this.config.auth.signup.redirectTo
    ]);
    this.$user.next(user);
  }

  onSignUpFailure = (err) => {
    this.serverMessage = err.message;
  }

  logout() {
    this._tokenService.reset();
    const { auth } = this.config;
    if (auth.logout && auth.logout.redirectTo) {
      this.router.navigate([auth.logout.redirectTo]);
    } else {
      this.router.navigate(['/']);
    }
  }
  validate() {
    console.log(this.config.api.prefix + this.config.api.me)
    return this._http.get<UserAccount>(this.config.api.prefix + this.config.api.me);
  }
}
