import { TestBed } from '@angular/core/testing';
import { CoreWebProviders } from './../core-shared-web';
import { CookieService } from './cookie.service';


describe('CookieService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CoreWebProviders]
  }));

  it('should be created', () => {
    const service: CookieService = TestBed.get(CookieService);
    expect(service).toBeTruthy();
  });
});
