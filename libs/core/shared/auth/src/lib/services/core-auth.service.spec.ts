import { TestBed } from '@angular/core/testing';

import { CoreAuthService } from './core-auth.service';

describe('CoreAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreAuthService = TestBed.get(CoreAuthService);
    expect(service).toBeTruthy();
  });
});
