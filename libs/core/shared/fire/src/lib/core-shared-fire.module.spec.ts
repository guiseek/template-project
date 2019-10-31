import { async, TestBed } from '@angular/core/testing';
import { CoreSharedFireModule } from './core-shared-fire.module';

describe('CoreSharedFireModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreSharedFireModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CoreSharedFireModule).toBeDefined();
  });
});
