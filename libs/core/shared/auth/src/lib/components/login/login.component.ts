import { Component, OnInit, Inject, Optional } from '@angular/core';
import { CoreAuthService } from '../../services/core-auth.service';
import { CORE_AUTH_CONFIG_TOKEN } from '../../config/core-auth.config';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  providers: [CoreAuthService]
})
export class LoginBaseComponent implements OnInit {

  public users: Array<any>;

  constructor(
    private authSerivce: CoreAuthService,
    // @Inject(CORE_AUTH_CONFIG_TOKEN) config?
  ) {
    // console.table(CoreAuthService.config)
    // console.log(document.cookie.length)

  }

  ngOnInit() {
    this.users = this.authSerivce.getUsers();
    this.afterGetHeroes();
  }
  protected afterGetHeroes() { }

  protected login(data) {
    return this.authSerivce.login(data)
      // .subscribe((res) => {
      //   console.table(res)
      // })
  }
}
