import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '@guiseek/core/shared/fire';
import { Observable } from 'rxjs';
import { User } from 'firebase/app';

@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls: ['./user-logged.component.scss']
})
export class UserLoggedComponent implements OnInit {
  user$: Observable<User>
  constructor(
    private auth: FireAuthService
  ) {
    this.user$ = this.auth.user$;
  }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
  }
}
