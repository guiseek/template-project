import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'ui-user-menu-button',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuButtonComponent {
  @HostBinding('attr.class') get userButtonClass() {
    return 'user-menu-button';
  }
}
