import { TestBed } from '@angular/core/testing';

import { FireStorageService } from './fire-storage.service';

describe('FireStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireStorageService = TestBed.get(FireStorageService);
    expect(service).toBeTruthy();
  });
});
