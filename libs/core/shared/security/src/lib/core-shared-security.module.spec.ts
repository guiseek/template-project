import { async, TestBed } from '@angular/core/testing';
import { CoreSharedSecurityModule } from './core-shared-security.module';

describe('CoreSharedSecurityModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreSharedSecurityModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreSharedSecurityModule).toBeDefined();
  });
});
