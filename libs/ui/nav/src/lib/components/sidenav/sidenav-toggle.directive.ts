import {
  Directive,
  OnInit,
  OnDestroy,
  HostBinding,
  HostListener
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import { NavItem } from '../../interfaces/nav-config.interfaces';
import { NavService } from '../../services/nav.service';

@Directive({
  selector: '[uiSidenavToggle]'
})
export class SidenavToggleDirective implements OnInit, OnDestroy {
  private mediaSubscription: Subscription;
  isMobile = false;

  @HostBinding('class.icon-sidenav')
  get isIconSidenav(): boolean {
    return this.service.isIconSidenav;
  }

  @HostBinding('class.collapsed')
  collapsed: boolean;

  currentlyOpen: NavItem[];

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isIconSidenav && !this.isMobile) {
      this.collapsed = false;

      this.service.currentlyOpen = this.currentlyOpen;
      // this.store.dispatch(new NextCurrentlyOpened(this.currentlyOpen));
      // this.store.dispatch(new SetIconMode(false));
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.isIconSidenav && !this.isMobile) {
      this.collapsed = true;

      this.currentlyOpen = this.service.currentlyOpen;
      this.service.currentlyOpen = [];
      // this.store.dispatch(new NextCurrentlyOpened([]));
      // this.store.dispatch(new SetIconMode(true));
    }
  }

  constructor(
    private service: NavService,
    private mediaObserver: MediaObserver
  ) {}

  ngOnInit() {
    this.mediaSubscription = this.mediaObserver
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        this.isMobile =
          change.mqAlias === 'xs' ||
          change.mqAlias === 'sm' ||
          change.mqAlias === 'md';
      });
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }
}
