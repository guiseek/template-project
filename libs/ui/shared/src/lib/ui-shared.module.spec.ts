import { async, TestBed } from '@angular/core/testing';
import { UiSharedModule } from './ui-shared.module';

describe('UiSharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiSharedModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiSharedModule).toBeDefined();
  });
});
