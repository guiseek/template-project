import { TestBed } from '@angular/core/testing';

import { CoreTokenService } from './core-token.service';

describe('CoreTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreTokenService = TestBed.get(CoreTokenService);
    expect(service).toBeTruthy();
  });
});
