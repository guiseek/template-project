import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, UserAccount } from '@guiseek/core/shared/security';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  userAccount: UserAccount;
  @ViewChild('authProfile', { static: true }) authProfile
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute
  ) {
    this.userAccount = this._route.snapshot.data.userAccount
    this.form = this._fb.group({

    })
  }

  ngOnInit() {
    // this._auth.user$.subscribe(console.table)
    if (this.userAccount) {
      this.authProfile.form.patchValue(
        this.userAccount
      )
    }
    console.log(
      this.authProfile
    )
  }

}
