import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@guiseek/core/shared/security';

@Component({
  selector: 'customer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sidenavOpen = true;
  sidenavMode = 'side';
  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }
  login() {
    this.auth.login({
      username: 'guiseek',
      password: 'gui'
    }).subscribe(console.table)
  }
}
