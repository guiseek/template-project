import { Injectable, Inject } from '@angular/core';
import { CORE_AUTH_CONFIG_TOKEN } from '../config/core-auth.config';
import { CoreAuthConfig } from '../interfaces/core-auth-config.interface';
import { UserAccount, Credentials, JwtPayload } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CoreTokenService } from './core-token.service';

export function authServiceInitializeApp(authService: CoreAuthService) {
  return () => authService.initializeApp();
}
@Injectable()
export class CoreAuthService {
  config: CoreAuthConfig
  api: string;

  $current = new BehaviorSubject<UserAccount>(undefined);
  current: UserAccount = undefined;
  current$: Observable<UserAccount> = this.$current.asObservable();

  private authSubject$ = new BehaviorSubject<UserAccount>(null);
  user$ = this.authSubject$.asObservable();

  constructor(
    @Inject(CORE_AUTH_CONFIG_TOKEN) _config: CoreAuthConfig,
    private _tokenService: CoreTokenService,
    private http: HttpClient,
    private router: Router
  ) {
    this._tokenService.getToken().then((token) => {
      console.log('_config: ', token)
    })


    this.api = _config.endpoint
    this.config = _config
    // CoreAuthService._config = _config
  }
  async initCurrent() {
    return this.getCurrent();
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initCurrent().then(value => {
        this.setCurrent(value);
        resolve();
      });
    });
  }
  getCurrent() {
    return this.current;
  }
  setCurrent(value: UserAccount) {
    if (!value) {
      this.current = undefined;
    //   this.clearPermissions().then(_ => (this.current = undefined));
    // } else {
    //   if (value.permissionNames.length) {
    //     this.loadPermissions(value).then(_ => (this.current = value));
    //   } else {
    //     this.clearPermissions().then(_ => (this.current = undefined));
    //   }
    } else {
      this.$current.next(value);
    }
  }
  login(credentials: Credentials) {
    return this.http
      .post<JwtPayload>(
        `${this.config.endpoint}/login`,
        credentials
      )
      .pipe(tap(({ token, user }: JwtPayload) => {
        console.log(token)
        if (token && token.accessToken) {
          console.log(token && token.accessToken)
          console.log(token.accessToken)
          this._tokenService.setCurrent(token.accessToken);
        }
        this.authSubject$.next(user);
      })).subscribe(
        () => this.router.navigate([this.config.redirect.success]),
        () => this.router.navigate([this.config.redirect.failure])
      )
  }
  me() {
    return this.http.get<UserAccount>(
      `${this.config.endpoint}/me`
    ).pipe(tap((me) => this.authSubject$.next(me)))
  }
  getUsers() {
    return [{
      email: 'silvio@gmail.com',
      password: 'silvio'
    }, {
      email: 'guiseek@gmail.com',
      password: 'guiseek'
    }]
  }
}
