import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private _tokenService: TokenService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!!this._tokenService.token) {
      console.log('this._tokenService: ', !!this._tokenService.token, this._tokenService)
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
    console.log('err: ', err);
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        // this._tokenService.reset();
        // this._router.navigateByUrl('/');
      }
    }
  }
}
