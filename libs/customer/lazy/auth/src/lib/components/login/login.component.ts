import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { CoreAuthService, LoginBaseComponent } from '@guiseek/core/shared/auth';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CoreAuthService]
})
export class AuthLoginComponent extends LoginBaseComponent {
  users: Array<any>;

  constructor(private authService: CoreAuthService) {
    super(authService);

    this.authService.user$.subscribe(data => {
      console.log('data: ', data);
    });
  }

  onLogin() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.login(this.form.value);
    }
  }
}
