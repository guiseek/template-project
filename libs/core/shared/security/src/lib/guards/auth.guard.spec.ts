import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CoreSharedSecurityModule } from '../core-shared-security.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SECURITY_CONFIG } from '../config/security-config.token';

describe('AuthGuard', () => {
  const config = {
    api: { prefix: '/api', login: '/auth/login', me: '/auth/me' },
    auth: {
      login: { path: '/auth/login', redirectTo: '/' },
      signup: { path: '/auth/signup', redirectTo: '/' },
      logout: { redirectTo: '/auth/login' }
    }
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoreSharedSecurityModule.forRoot(config),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [AuthGuard]
    });

  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    const authService = TestBed.get(AuthenticationService)
    const router = TestBed.get(Router)
    const configs = TestBed.get(SECURITY_CONFIG)
    guard = new AuthGuard(
      configs,
      authService,
      router
    )
    expect(guard).toBeTruthy();
  }));
});
