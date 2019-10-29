import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'customer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sidenavOpen = true;
  sidenavMode = 'side';
  constructor() { }

  ngOnInit() {
  }

}
