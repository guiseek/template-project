import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SECURITY_CONFIG, CoreSecurityConfig, AuthenticationService } from '@guiseek/core/shared/security';

@Component({
  selector: 'core-auth-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  signIn: string;
  constructor(
    @Inject(SECURITY_CONFIG) public config: CoreSecurityConfig,
    private _fb: FormBuilder,
    private authSerivce: AuthenticationService
  ) {
    // console.log(config)
    this.signIn = config.auth.login.path;
    this.form = this._fb.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(64)]
      ],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(64)]
      ],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  ngOnInit() {}
  signUp() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      return this.authSerivce.login(this.form.value);
    }
  }
}
