import { async, TestBed } from '@angular/core/testing';
import { CustomerLazyAuthModule } from './customer-lazy-auth.module';

describe('CustomerLazyAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomerLazyAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CustomerLazyAuthModule).toBeDefined();
  });
});
