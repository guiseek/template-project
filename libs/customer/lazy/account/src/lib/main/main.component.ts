import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserAccount } from '@guiseek/core/shared/security';
import { Observable } from 'rxjs';

@Component({
  selector: 'customer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sidenavOpen = true;
  sidenavMode = 'side';
  user$: Observable<UserAccount>;
  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.user$ = this.auth.validate()
  }
  onLogout() {
    this.auth.logout()
  }
}
