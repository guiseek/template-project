import { Component } from '@angular/core';
import { ICustomer } from '@guiseek/data';

@Component({
  selector: 'guiseek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'customer';
  customers: ICustomer;
  sidenavOpen = true;
  sidenavMode = 'side';
}
