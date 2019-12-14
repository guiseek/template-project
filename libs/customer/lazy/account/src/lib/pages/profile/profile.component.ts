import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, UserAccount, UserAccountService } from '@guiseek/core/shared/security';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userAccount: UserAccount;
  @ViewChild('authProfile', { static: true }) authProfile
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserAccountService
  ) {
    this.userAccount = this._route.snapshot.data.userAccount;
  }

  ngOnInit() {
    // this._auth.user$.subscribe(console.table)
    if (this.userAccount) {
      this.authProfile.form.patchValue(
        this.userAccount
      )
    }
    console.log(
      this.userAccount
    )
  }
  onSave(data: UserAccount) {
    console.table(
      data
    )
    this._userService.updateUserAccount(
      data
    ).subscribe((res) => {
      console.log(res)
    })
  }
}
