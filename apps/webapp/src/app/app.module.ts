import { A11yModule } from '@angular/cdk/a11y';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreSharedFireModule } from '@guiseek/core/shared/fire';
import { UiSharedModule } from '@guiseek/ui/shared';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { UserLoggedComponent } from './components/user-logged/user-logged.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServicesComponent } from './pages/services/services.component';
import { ShellComponent } from './shell/shell.component';






const appRoutes: Route[] = [
  {
    path: '', component: ShellComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'products', component: ProductsComponent },

    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) }
]

@NgModule({
  declarations: [AppComponent, ContactComponent, HomeComponent, ShellComponent, ServicesComponent, ProductsComponent, UserLoggedComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiSharedModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    A11yModule,
    FlexLayoutModule,
    LayoutModule,
    CoreSharedFireModule.forRoot({
      firebase: environment.firebase,
      collections: ['users']
    }),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled', useHash: true }),
    AuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'whats-app',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/whatsapp.svg')
    );
    iconRegistry.addSvgIcon(
      'google-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/google-logo.svg')
    );
  }
}
