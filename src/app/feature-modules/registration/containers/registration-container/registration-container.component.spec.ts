import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { User } from 'fab-core/api/model/user.interface';
import { UserFormValue } from 'fab-features/registration/model/user-form-value.interface';
import { RegistrationFacadeService } from 'fab-features/registration/services/registration.facade.service';
import { containerTestModuleBaseConfiguration } from 'fab-test/container.test.functions';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { RegistrationContainerComponent } from './registration-container.component';
import Spy = jasmine.Spy;

describe('RegistrationContainerComponent', () => {
  let component: RegistrationContainerComponent;
  let fixture: ComponentFixture<RegistrationContainerComponent>;
  let facadeServiceSpy: jasmine.SpyObj<RegistrationFacadeService>;
  let clipboardSpy: jasmine.SpyObj<Clipboard>;
  const userFormSubject$ = new BehaviorSubject<UserFormValue | null>(null);
  const lastRegisteredUserSubj$ = new BehaviorSubject<User | null>(null);

  const name = 'name';
  const email = 'email@e.co';
  const gender = 'male';
  const status = 'active';

  beforeEach(() => {
    const facadeSpy = jasmine.createSpyObj(
      'RegistrationFacadeService',
      ['userRegistration', 'initSubscription', 'persistForm', 'clearSubscription', 'clearObservables'],
      {
        'userFormSubject$': userFormSubject$,
        'userForm$': userFormSubject$.asObservable(),
        'lastRegisteredUserSubj$': lastRegisteredUserSubj$,
        'lastRegisteredUser$': lastRegisteredUserSubj$.asObservable(),
      },
    );
    const clipSpy = jasmine.createSpyObj(
      'Clipboard',
      ['copy'],
    );
    TestBed.configureTestingModule(containerTestModuleBaseConfiguration({
      imports: [
        MatSelectModule,
        MatTooltipModule,
        MatIconModule,
        ClipboardModule,
      ],
      declarations: [RegistrationContainerComponent],
      providers: [
        { provide: RegistrationFacadeService, useValue: facadeSpy },
        { provide: Clipboard, useValue: clipSpy },
      ],
    }));
    fixture = TestBed.createComponent(RegistrationContainerComponent);
    component = fixture.componentInstance;
    facadeServiceSpy = TestBed.inject(RegistrationFacadeService) as jasmine.SpyObj<RegistrationFacadeService>;
    clipboardSpy = TestBed.inject(Clipboard) as jasmine.SpyObj<Clipboard>;
    fixture.detectChanges();

    (Object.getOwnPropertyDescriptor(facadeServiceSpy, 'userForm$')?.get as Spy<() => Observable<UserFormValue | null>>).and.returnValue(of(null));
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    userFormSubject$.next(null);
    lastRegisteredUserSubj$.next(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should persist user form value', () => {
    const formPatchValueSpy = spyOn(component.userForm, 'patchValue');
    userFormSubject$.next({ name, email, gender, status });

    expect(formPatchValueSpy.calls.argsFor(0))
      .withContext('component form displays data stored in the service')
      .toEqual([{ name, email, gender, status }, { emitEvent: false }]);
  });

  it('should reset user form values', () => {
    const formResetSpy = spyOn(component.userForm, 'reset');
    userFormSubject$.next(null);

    expect(formResetSpy)
      .withContext('component form is reset when there is no data stored in the service')
      .toHaveBeenCalledTimes(1);
  });

  it('should save form data into the service', fakeAsync(() => {
    component.userForm.patchValue({ name, email, gender, status });

    tick(100);
    expect(facadeServiceSpy.persistForm.calls.count())
      .withContext('RegistrationFacadeService spy method persistForm was not yet called after a 100ms delay')
      .toBe(0);

    tick(500);
    expect(facadeServiceSpy.persistForm.calls.count())
      .withContext('RegistrationFacadeService spy method persistForm was called once after a 500ms delay')
      .toBe(1);
  }));

  it('should copy registered user id', () => {
    const userId = 123;
    component.copyUserId(userId);

    expect(clipboardSpy.copy.calls.argsFor(0))
      .withContext('Clipboard spy method copy was called once')
      .toEqual(['123']);
  });

  it('should show tooltip on gender select click', () => {
    const matTooltip = component.matTooltip as MatTooltip;
    const spyOnShowTooltip = spyOn(matTooltip, 'show');

    component.genderSelectClicked();

    expect(spyOnShowTooltip)
      .toHaveBeenCalledTimes(1);
  });

  it('should reset user form values', () => {
    const formResetSpy = spyOn(component.userForm, 'reset');

    component.clearForm();

    expect(formResetSpy)
      .toHaveBeenCalledTimes(1);
  });

  it('should register a new user', () => {
    component.userForm.patchValue({ name, email, gender, status });

    component.userRegistration();

    expect(facadeServiceSpy.userRegistration.calls.count())
      .withContext('RegistrationFacadeService spy method userRegistration was called once')
      .toBe(1);
    expect(facadeServiceSpy.userRegistration.calls.argsFor(0))
      .withContext('RegistrationFacadeService spy method userRegistration was called with userFarm raw value')
      .toEqual([{ name, email, gender, status }]);
  });

  it('should validate user name, gender and status', () => {
    expect(component.userForm.controls.name.invalid).toBeTrue();
    expect(component.userForm.controls.name.errors?.['required']).toBeTruthy();
    expect(component.userForm.controls.gender.invalid).toBeTrue();
    expect(component.userForm.controls.gender.errors?.['required']).toBeTruthy();
    expect(component.userForm.controls.status.invalid).toBeTrue();
    expect(component.userForm.controls.status.errors?.['required']).toBeTruthy();

    component.userForm.controls.name.patchValue(name);
    component.userForm.controls.gender.patchValue(gender);
    component.userForm.controls.status.patchValue(status);

    expect(component.userForm.controls.name.valid).toBeTrue();
    expect(component.userForm.controls.name.valid).toBeTrue();
    expect(component.userForm.controls.status.valid).toBeTrue();
  });

  it('should validate user email', () => {
    expect(component.userForm.controls.email.invalid).toBeTrue();
    expect(component.userForm.controls.email.errors?.['required']).toBeTruthy();

    component.userForm.controls.email.patchValue(name);

    expect(component.userForm.controls.email.errors?.['email']).toBeTruthy();
    expect(component.userForm.controls.email.invalid).toBeTrue();

    component.userForm.controls.email.patchValue(email);
    expect(component.userForm.controls.email.valid).toBeTrue();
  });
});
