import { TestBed, async, inject } from '@angular/core/testing';

import { AuthCustomerGuard } from './auth-customer.guard';

describe('AuthCustomerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCustomerGuard]
    });
  });

  it('should ...', inject([AuthCustomerGuard], (guard: AuthCustomerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
