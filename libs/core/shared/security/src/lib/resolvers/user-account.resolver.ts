import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { UserAccount } from '../interfaces';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountResolver implements Resolve<UserAccount> {

  constructor(
    private service: AuthenticationService,
    private router: Router
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserAccount> | Observable<never> {
    const id = route.params.id;

    return this.service.validate().pipe(
      take(1),
      mergeMap(instructor => {
        if (instructor) {
          return of(instructor)
        } else {
          this.router.navigate(['/auth'])
          return EMPTY
        }
      })
    )
  }
}
