import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@guiseek/core/shared/security';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class CustomerLoginComponent implements OnInit {
  constructor(private authService: AuthenticationService) {
    // super(authService);

    this.authService.user$.subscribe(data => {
      console.log('data: ', data);
    });
  }

  ngOnInit() { }
  onLogin() {
    // this.
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    //   this.login(this.form.value);
    // }
  }
}
