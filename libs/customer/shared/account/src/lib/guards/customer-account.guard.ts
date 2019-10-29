import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreAuthService } from '@guiseek/core/shared/auth';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountGuard implements CanActivate {
  constructor(
    // private coreAuthService: CoreAuthService
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
