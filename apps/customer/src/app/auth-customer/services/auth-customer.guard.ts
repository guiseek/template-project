import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { CoreAuthService } from '@guiseek/core/shared/auth';
import { AuthCustomerService } from './auth-customer.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthCustomerGuard implements CanActivate {
  constructor(private service: AuthCustomerService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.service.me$.pipe(
      take(1),
      map(me => !!me),
      tap(me => {
        if (!me) this.router.navigate(['/']);
      })
    );
    return true;
  }
}
