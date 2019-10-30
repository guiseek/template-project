import { TestBed } from '@angular/core/testing';

import { FireAuthService } from './fire-auth.service';

describe('FireAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireAuthService = TestBed.get(FireAuthService);
    expect(service).toBeTruthy();
  });
});
