import { async, TestBed } from '@angular/core/testing';
import { UiUploaderModule } from './ui-uploader.module';

describe('UiUploaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiUploaderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiUploaderModule).toBeDefined();
  });
});
