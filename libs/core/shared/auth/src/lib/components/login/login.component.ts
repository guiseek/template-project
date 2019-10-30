import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  AuthenticationService,
  SECURITY_CONFIG,
  CoreSecurityConfig
} from '@guiseek/core/shared/security';
import { MatDialog } from '@angular/material';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'core-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  signUp: string;
  constructor(
    @Inject(SECURITY_CONFIG) public config: CoreSecurityConfig,
    private _fb: FormBuilder,
    private authSerivce: AuthenticationService,
    private dialogService: MatDialog
  ) {
    // console.log(config)
    this.signUp = config.auth.signup.path;
    this.form = this._fb.group({
      username: ['guiseek', [Validators.maxLength(64)]],
      email: ['', [Validators.email, Validators.maxLength(64)]],
      password: ['guiseek', [Validators.required]]
    });
  }

  ngOnInit() {}
  login() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      return this.authSerivce.login(this.form.value)
        .subscribe(console.table)
    }
  }
  forgotPassword() {
    const ref = this.dialogService.open(ForgotPasswordComponent, {
      // header: { title: 'Recuperar conta' },
      // withShell: true
    });
    const sub = ref.afterClosed().subscribe(result => {
      if (result) {
        this.openAlert();
      }
      sub.unsubscribe();
    });
  }
  openAlert() {
    // const ref = this.dialogService.openAlert({
    //   type: 'info',
    //   message: 'Acesse seu email, copie o código enviado e volte para configurar sua nova senha, ok?'
    // })
    // const sub = ref.afterClosed()
    //   .subscribe((result) => {
    //     sub.unsubscribe()
    //     if (result) {
    //       this.openResetPassword()
    //     }
    //   })
  }
  openResetPassword() {
    const ref = this.dialogService.open(ChangePasswordComponent, {
      // withShell: true,
      // header: {
      //   title: 'Nova senha',
      //   subtitle: 'Use o código recebido no email'
      // }
    });
    const sub = ref.afterClosed().subscribe(result => {
      console.log('result: ', result);
      sub.unsubscribe();
    });
  }
}
