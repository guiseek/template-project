import { async, TestBed } from '@angular/core/testing';
import { CustomerLazyAccountModule } from './customer-lazy-account.module';

describe('CustomerLazyAccountModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomerLazyAccountModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CustomerLazyAccountModule).toBeDefined();
  });
});
