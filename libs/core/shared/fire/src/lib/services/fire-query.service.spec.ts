import { TestBed } from '@angular/core/testing';

import { FireQueryService } from './fire-query.service';

describe('FireQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireQueryService = TestBed.get(FireQueryService);
    expect(service).toBeTruthy();
  });
});
