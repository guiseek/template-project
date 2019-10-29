import { TestBed } from '@angular/core/testing';

import { CustomerAccountService } from './customer-account.service';

describe('CustomerAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerAccountService = TestBed.get(CustomerAccountService);
    expect(service).toBeTruthy();
  });
});
