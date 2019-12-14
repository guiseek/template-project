import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreSharedFireModule } from '@guiseek/core/shared/fire';
import { UiSharedModule } from '@guiseek/ui/shared';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CoreSharedFireModule,
        UiSharedModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: FirestoreSettingsToken, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
