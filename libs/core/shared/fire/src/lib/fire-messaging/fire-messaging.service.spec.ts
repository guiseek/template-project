import { TestBed } from '@angular/core/testing';

import { FireMessagingService } from './fire-messaging.service';

describe('FireMessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireMessagingService = TestBed.get(FireMessagingService);
    expect(service).toBeTruthy();
  });
});
