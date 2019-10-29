import { TestBed, async, inject } from '@angular/core/testing';

import { CustomerAccountGuard } from './customer-account.guard';

describe('CustomerAccountGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerAccountGuard]
    });
  });

  it('should ...', inject(
    [CustomerAccountGuard],
    (guard: CustomerAccountGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
});
