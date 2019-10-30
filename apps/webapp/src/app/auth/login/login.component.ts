import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FireAuthService } from '@guiseek/core/shared/fire';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private auth: FireAuthService
  ) {
    this.form = this._fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    })
  }

  ngOnInit() {
  }
  login() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.auth.emailLogin(
        this.form.value
      )
      console.log(
        this.form.value
      )
    }
  }
}
