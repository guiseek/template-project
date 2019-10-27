import { TestBed } from '@angular/core/testing';

import { AuthCustomerService } from './auth-customer.service';

describe('AuthCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthCustomerService = TestBed.get(AuthCustomerService);
    expect(service).toBeTruthy();
  });
});
