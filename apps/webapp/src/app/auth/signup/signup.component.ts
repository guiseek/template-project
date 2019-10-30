import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '@guiseek/core/shared/fire';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
  signUp() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(
        this.form.value
      )
    }
  }
}
