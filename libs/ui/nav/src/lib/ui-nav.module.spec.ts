import { async, TestBed } from '@angular/core/testing';
import { UiNavModule } from './ui-nav.module';

describe('UiNavModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiNavModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiNavModule).toBeDefined();
  });
});
