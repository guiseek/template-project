import { async, TestBed } from '@angular/core/testing';
import { CoreSharedAuthModule } from './core-shared-auth.module';

describe('CoreSharedAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreSharedAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreSharedAuthModule).toBeDefined();
  });
});
