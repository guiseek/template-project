import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';
import { SearchComponent } from './components/search/search.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SidenavToggleDirective } from './components/sidenav/sidenav-toggle.directive';
import { NavItem } from './interfaces/nav-config.interfaces';
import { NavService } from './services/nav.service';
import { NAV_ITEMS } from './config/nav.config';
import { WindowToken, windowProvider } from './utils/window';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { UserMenuButtonComponent } from './components/user-menu/user-menu-button/user-menu-button.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

const matModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule
];

@NgModule({
  imports: [CommonModule, ...matModules, FlexLayoutModule, RouterModule],
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    SidenavItemComponent,
    SearchComponent,
    SearchBoxComponent,
    SidenavToggleDirective,
    UserMenuComponent,
    UserMenuButtonComponent,
    BreadcrumbsComponent
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    SidenavItemComponent,
    SearchComponent,
    SearchBoxComponent,
    SidenavToggleDirective,
    UserMenuComponent,
    UserMenuButtonComponent,
    BreadcrumbsComponent
  ],
  providers: [{ provide: WindowToken, useFactory: windowProvider }]
})
export class UiNavModule {
  static forRoot(items: NavItem[]): ModuleWithProviders {
    return {
      ngModule: UiNavModule,
      providers: [NavService, { provide: NAV_ITEMS, useValue: items }]
    };
  }
}
