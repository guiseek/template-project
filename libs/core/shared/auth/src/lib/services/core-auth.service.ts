import { Injectable, Inject } from '@angular/core';
import { CORE_AUTH_CONFIG_TOKEN } from '../config/core-auth.config';
import { CoreAuthConfig } from '../interfaces/core-auth-config.interface';
import { UserAccount, Credentials, JwtPayload } from '../interfaces';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class CoreAuthService {
  config: CoreAuthConfig
  api: string;

  private authSubject$ = new BehaviorSubject<UserAccount>(null);
  user$ = this.authSubject$.asObservable();

  constructor(
    @Inject(CORE_AUTH_CONFIG_TOKEN) _config: CoreAuthConfig,
    private http: HttpClient,
    private router: Router
  ) {
    console.log(_config)
    this.api = _config.endpoint
    this.config = _config
    // CoreAuthService._config = _config
  }
  login(credentials: Credentials) {
    return this.http
      .post<JwtPayload>(
        `${this.config.endpoint}/login`,
        credentials
      )
      .pipe(tap(({ token, user }: JwtPayload) => {
        this.authSubject$.next(user);
      })).subscribe(
        () => this.router.navigate([this.config.redirect.success]),
        () => this.router.navigate([this.config.redirect.failure])
      )
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
