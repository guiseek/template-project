import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '@guiseek/core/shared/fire';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  methods = [
    { path: '/auth/login', label: 'Login' },
    { path: '/auth/signup', label: 'Cadastro' }
  ]
  constructor(
    private service: FireAuthService
  ) { }

  ngOnInit() {
  }
  goBack() {
    window.history.back();
  }
  onGoogle() {
    this.service.googleLogin()
      .then(auth => {
        console.log(auth)
      })
  }
}
