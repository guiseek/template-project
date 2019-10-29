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
    }, 3000)
  }
}
