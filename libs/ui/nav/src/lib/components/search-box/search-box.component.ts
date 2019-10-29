import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
  ElementRef
} from '@angular/core';
import { NavItem } from '../../interfaces/nav-config.interfaces';
import { Router, NavigationEnd } from '@angular/router';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'ui-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBoxComponent implements OnInit {
  input: string;
  focused: boolean;

  recentlyVisited: NavItem[] = [];

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private service: NavService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const item = this.service.getItemByRoute(event.urlAfterRedirects);

        if (item) {
          const index = this.recentlyVisited.indexOf(item);
          if (index > -1) {
            this.recentlyVisited.splice(index, 1);
          }

          this.recentlyVisited.unshift(item);

          if (this.recentlyVisited.length > 5) {
            this.recentlyVisited.pop();
          }
        }
      }
    });
  }
  openDropdown() {
    this.focused = true;
  }

  closeDropdown() {
    this.focused = false;
  }
  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.closeDropdown();
    }
  }
}
