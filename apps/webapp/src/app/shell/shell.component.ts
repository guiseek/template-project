import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { FireAuthService } from '@guiseek/core/shared/fire';
import { User } from 'firebase/app';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  pages = [
    { path: '/',  label: 'Começo' },
    { path: '/services',  label: 'Serviços' },
    { path: '/products', label: 'Produtos' },
    { path: '/contact', label: 'Contato' }
  ]
  @ViewChild('drawer', { static: true }) sidenav: MatSidenav
  user$: Observable<User>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: FireAuthService
  ) {
    this.user$ = this.auth.user$
  }

  ngOnInit() {
    console.log(this.sidenav)
  }
  goTo(page) {
    this.router.navigate([page]);
    this.sidenav.close();
  }
}
