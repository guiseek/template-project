import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreSharedFireModule } from '@guiseek/core/shared/fire';
import { UiSharedModule } from '@guiseek/ui/shared';
import { UserLoggedComponent } from './../components/user-logged/user-logged.component';
import { ShellComponent } from './shell.component';


describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShellComponent, UserLoggedComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        CoreSharedFireModule,
        LayoutModule,
        UiSharedModule
      ],
      providers: [
        { provide: FirestoreSettingsToken, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
