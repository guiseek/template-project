import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectorRef,
  Inject
} from '@angular/core';
import { NavItem } from '../../interfaces/nav-config.interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { WindowToken } from '../../utils/window';

@Component({
  selector: 'ui-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy {
  items: NavItem[];
  sub: Subscription;
  constructor(
    private router: Router,
    private service: NavService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    @Inject(WindowToken) private window: Window
  ) {}

  ngOnInit() {
    this.sub = this.service.items$.subscribe((items: NavItem[]) => {
      this.items = items;
    });
  }
  toggleIconSidenav() {
    setTimeout(() => {
      this.window.dispatchEvent(new Event('resize'));
    }, 300);

    this.service.isIconSidenav = !this.service.isIconSidenav;

    const snackBarConfig: MatSnackBarConfig = {
      duration: 6000
    } as MatSnackBarConfig;

    if (this.service.isIconSidenav) {
      this.snackBar.open(
        'Mais espaço para sua área de trabalho, mova o mouse para o conteúdo.',
        // 'You activated Icon-Sidenav, move your mouse to the content and see what happens!',
        '',
        snackBarConfig
      );
    }
  }
  get isIconSidenav(): boolean {
    return this.service.isIconSidenav;
  }
  ngOnDestroy() {
    return this.sub && this.sub.unsubscribe();
  }
}
