import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreAuthService, LoginBaseComponent } from '@guiseek/core/shared/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CoreAuthService]
})
export class AuthLoginComponent extends LoginBaseComponent {
  users: Array<any>
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
  constructor(
    private authService: CoreAuthService
    // private http: HttpClient
  ) {
    super(authService)
    this.authService.user$.subscribe((data) => {
      console.log('data: ', data)
    })
  }
  // protected afterGetHeroes() {
  //   this.users = this.users.sort((u1, u2) => {
  //     return u1.email < u2.email ? -1 :
  //       (u1.email > u2.email ? 1 : 0);
  //   });
  // }
  // ngOnInit() {
  // }
  onLogin() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.login(this.form.value)
    }

    // this.http.post('/api/auth/login', { email: 'guiseek@gmail.com', password: 'guiseek' })
    //   .subscribe((response) => {
    //     console.log(response)
    //   })
  }
}
