import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  HostBinding
} from '@angular/core';
import { NavItem } from '../../interfaces/nav-config.interfaces';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'ui-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavItemComponent implements OnInit {
  @Input() item: NavItem;

  @HostBinding('class.open')
  get isOpen() {
    return this.service.isOpen(this.item);
  }

  @HostBinding('class.sidenav-item')
  sidenavItemClass = true;

  constructor(private service: NavService) {}

  ngOnInit() {}

  toggleDropdown(): void {
    if (this.item.children && this.item.children.length > 0) {
      this.service.toggleItemOpen(this.item);
    }
  }

  // Receives the count of Sub Items and multiplies it with 48 (height of one SidenavItem) to set the height for animation.
  getSubItemsHeight(): string {
    return this.getOpenSubItemsCount(this.item) * 48 + 'px';
  }

  // Counts the amount of Sub Items there is and returns the count.
  private getOpenSubItemsCount(item: NavItem): number {
    let count = 0;

    if (
      item.children &&
      item.children.length > 0 &&
      this.service.isOpen(item)
    ) {
      count += item.children.length;

      item.children.forEach(subItem => {
        count += this.getOpenSubItemsCount(subItem);
      });
    }

    return count;
  }
}
