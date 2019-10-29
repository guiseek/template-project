import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webapp';

  calling = false;

  ngOnInit() {
    window.setInterval(() => {
      this.calling = !this.calling;
    }, 10000)
  }
  onCall() {
    // window.open('<a href="whatsapp://tel:3216541234')
  }
}
