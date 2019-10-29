import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreAuthService, UserAccount } from '@guiseek/core/shared/auth';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@guiseek/core/shared/security';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  user$: Observable<UserAccount>
  constructor(
    private authService: AuthenticationService
    // private authService: CoreAuthService
  ) { }

  ngOnInit() {
    this.user$ = this.authService.user$
  }

}
