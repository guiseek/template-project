import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { SECURITY_CONFIG } from '../config/security-config.token';
import { CoreSecurityConfig } from '../interfaces/security-config.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(SECURITY_CONFIG) private config: CoreSecurityConfig,
    private service: AuthenticationService,
    private router: Router
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin(state.url);
  }
  checkLogin(url: string) {
    if (this.service.isLoggedIn) {
      return true;
    }
    this.service.redirectUrl = url;

    return this.service.validate().pipe(
      map(auth => !!auth),
      tap(auth => !auth && this.doRedirect())
    );
  }
  doRedirect() {
    if (this.config && this.config.auth) {
      this.router.navigateByUrl(this.config.auth.login.path);
    }
  }
}
