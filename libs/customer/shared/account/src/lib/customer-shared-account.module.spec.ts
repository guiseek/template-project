import { async, TestBed } from '@angular/core/testing';
import { CustomerSharedAccountModule } from './customer-shared-account.module';

describe('CustomerSharedAccountModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomerSharedAccountModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CustomerSharedAccountModule).toBeDefined();
  });
});
