import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '@guiseek/core/shared/security';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  // providers: [CoreAuthService]
})
export class LoginBaseComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.maxLength(64)]),
    email: new FormControl('', [Validators.email, Validators.maxLength(64)]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private authSerivce: AuthenticationService) {}

  protected login(data) {
    return this.authSerivce.login(data)
  }
}
