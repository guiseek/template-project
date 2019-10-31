import { Injectable, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SECURITY_CONFIG } from '../config/security-config.token';
import { CoreSecurityConfig } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    @Inject(SECURITY_CONFIG) private config: CoreSecurityConfig,
    private _tokenService: TokenService,
    private _router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!!this._tokenService.token) {
      request = request.clone({
        setHeaders: this._tokenService.headers
      });
    }
    return next.handle(request).pipe(
      catchError(err => {
        this.catchRedirectError(err);
        return throwError(err);
      })
    );
  }
  catchRedirectError(err: any): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this._tokenService.reset();
        this._router.navigateByUrl(
          this.config.auth.login.path
        );
      }
    }
  }
}
