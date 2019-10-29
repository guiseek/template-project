import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { CoreTokenService } from '../services/core-token.service';
import { JwtConfig } from '../interfaces/jwt-config.interface';
import { CORE_JWT_CONFIG_TOKEN } from '../config/jwt.config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    @Inject(CORE_JWT_CONFIG_TOKEN) private _jwtConfig: JwtConfig,
    private _tokenService: CoreTokenService,
    private _router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._tokenService.getCurrent()) {
      request = request.clone({
        setHeaders: this._tokenService.getHeader()
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
        this._tokenService.clearToken();
        this._router.navigateByUrl('/');
      }
    }
  }
}

//     private router: Router
//   ) { }
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = this._tokenService.token;
//     if (token) request = this.getCloneRequestWithToken(request, token);

//     console.log(request.url)
//     return next.handle(request).pipe(
//       catchError(err => {
//         this.catchRedirectError(err);
//         return throwError(err);
//       })
//     );
//   }
//   getCloneRequestWithToken(request: HttpRequest<any>, token: string) {
//     console.log('token: ', token);
//     return request.clone({
//       setHeaders: this._tokenService.header
//     });
//   }
// }
