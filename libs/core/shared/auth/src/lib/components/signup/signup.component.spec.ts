import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, SECURITY_CONFIG } from '@guiseek/core/shared/security';
import { UiSharedModule } from '@guiseek/ui/shared';
import { SignupComponent } from './signup.component';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        UiSharedModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: SECURITY_CONFIG, useValue: {
            api: { prefix: '/api', login: '/auth/login', me: '/auth/me' },
            auth: {
              login: { path: '/auth/login', redirectTo: '/' },
              signup: { path: '/auth/signup', redirectTo: '/auth/login' },
              logout: { redirectTo: '/auth/login' }
            }
          }
        },
        AuthenticationService
      ],
      declarations: [SignupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
