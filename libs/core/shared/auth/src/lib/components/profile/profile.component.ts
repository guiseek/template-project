import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { CoreAuthService } from '../../services/core-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from '@guiseek/core/shared/security';

@Component({
  selector: 'core-auth-profile',
  exportAs: 'authProfile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  @Output() submitted = new EventEmitter<UserAccount>();
  constructor(private _fb: FormBuilder) // private _service: CoreAuthService
  {
    this.form = this._fb.group({
      id: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.maxLength(15)
      ]],
      username: ['', [
        Validators.required
      ]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [
        Validators.required
      ]]
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // this._service.me().subscribe(console.table);
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.form.value);
      this.submitted.emit(this.form.value);
    }
  }
}
