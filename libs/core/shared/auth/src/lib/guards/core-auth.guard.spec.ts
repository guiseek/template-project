import { TestBed, async, inject } from '@angular/core/testing';

import { CoreAuthGuard } from './core-auth.guard';

describe('CoreAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreAuthGuard]
    });
  });

  it('should ...', inject([CoreAuthGuard], (guard: CoreAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
