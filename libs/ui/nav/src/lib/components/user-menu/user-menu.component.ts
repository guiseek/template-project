import { Component, OnInit, HostListener, ElementRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  isOpen: boolean;
  @Output() logout = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  closeDropdown() {
    this.isOpen = false;
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

  onLogout() {
    this.logout.emit();
  }
}
