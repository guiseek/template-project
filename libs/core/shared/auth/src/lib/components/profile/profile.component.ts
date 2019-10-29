import { Component, OnInit } from '@angular/core';
import { CoreAuthService } from '../../services/core-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  constructor(private _fb: FormBuilder, private _service: CoreAuthService) {
    this.form = this._fb.group({
      id: [{ value: '', disabled: true }],
      role: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this._service.me().subscribe(console.table);
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.form.value);
      // this._service
    }
  }
}
