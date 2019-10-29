import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';
import { CoreSharedSecurityModule } from '../core-shared-security.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
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
      providers: [
        AuthenticationService
      ]
    })
  });

  it('should be created', () => {
    service = TestBed.get(AuthenticationService)
    expect(service).toBeTruthy();
  });
});
