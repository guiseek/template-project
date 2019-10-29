import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { SECURITY_CONFIG } from '../config/security-config.token';
import { CoreSecurityConfig } from '../interfaces/security-config.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(SECURITY_CONFIG) private config: CoreSecurityConfig,
    private service: AuthenticationService,
    private router: Router
  ) {
    console.log(config)
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    return this.checkLogin(state.url);
  }
  checkLogin(url: string) {
    if (this.service.isLoggedIn) { return true }

    console.log(this.service.config)
    this.service.redirectUrl = url;

    if (this.config && this.config.auth) {
      this.router.navigateByUrl(
        this.config.auth.login.path
      );
    }
    return false;
  }
}
