import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreSharedFireModule } from '@guiseek/core/shared/fire';
import { UiSharedModule } from '@guiseek/ui/shared';
import { UserLoggedComponent } from './user-logged.component';

describe('UserLoggedComponent', () => {
  let component: UserLoggedComponent;
  let fixture: ComponentFixture<UserLoggedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UiSharedModule,
        MatSnackBarModule,
        CoreSharedFireModule
      ],
      declarations: [ UserLoggedComponent ],
      providers: [
        { provide: FirestoreSettingsToken, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
