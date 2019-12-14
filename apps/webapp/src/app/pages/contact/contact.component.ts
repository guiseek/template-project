import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  constructor(
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.table(this.form.value)
    }
  }
}
