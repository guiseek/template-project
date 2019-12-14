import { TestBed } from '@angular/core/testing';
import { CoreWebProviders } from './../core-shared-web';
import { BrowserStorageService } from './browser-storage.service';


describe('BrowserStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CoreWebProviders,
      BrowserStorageService
    ]
  }));

  it('should be created', () => {
    const service: BrowserStorageService = TestBed.get(BrowserStorageService);
    expect(service).toBeTruthy();
  });
});
