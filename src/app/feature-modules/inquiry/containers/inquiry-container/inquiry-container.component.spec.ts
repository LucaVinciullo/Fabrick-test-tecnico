import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InquiryFacadeService } from 'fab-features/inquiry/services/inquiry.facade.service';
import { containerTestModuleBaseConfiguration } from 'fab-test/container.test.functions';
import { InquiryContainerComponent } from './inquiry-container.component';

describe('InquiryContainerComponent', () => {
  let component: InquiryContainerComponent;
  let fixture: ComponentFixture<InquiryContainerComponent>;
  let facadeServiceSpy: jasmine.SpyObj<InquiryFacadeService>;

  beforeEach(() => {
    const facadeSpy = jasmine.createSpyObj(
      'InquiryFacadeService',
      ['userInquiry', 'initSubscription', 'clearSubscription', 'clearObservables'],
      ['usersSubject$', 'users$'],
    );
    TestBed.configureTestingModule(containerTestModuleBaseConfiguration({
      declarations: [
        InquiryContainerComponent,
      ],
      providers: [
        { provide: InquiryFacadeService, useValue: facadeSpy },
      ],
    }));

    fixture = TestBed.createComponent(InquiryContainerComponent);
    component = fixture.componentInstance;
    facadeServiceSpy = TestBed.inject(InquiryFacadeService) as jasmine.SpyObj<InquiryFacadeService>;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate data inquiry users', () => {
    let userIdValue = 123;
    component.idForm.controls.id.patchValue(userIdValue);
    expect(component.idForm.valid)
      .withContext('userId is valid when it\'s represented by an integer number')
      .toBeTrue();

    userIdValue = 123.1;
    component.idForm.controls.id.patchValue(userIdValue);
    expect(component.idForm.valid)
      .withContext('userId is valid when it\'s represented by a comma number')
      .toBeFalse();
    expect(component.hasPatternError)
      .toBeTrue();
  });

  it('stores locally the last id used in an inquiry', () => {
    const userIdValue = 123;
    component.idForm.controls.id.patchValue(userIdValue);
    expect(component.lastInquiredId).not.toEqual(userIdValue);

    component.inquiryUser();
    expect(component.lastInquiredId).toEqual(userIdValue);
    expect(facadeServiceSpy.userInquiry.calls.count())
      .withContext('InquiryFacadeService spy method userInquiry was called once')
      .toBe(1);
    expect(facadeServiceSpy.userInquiry.calls.argsFor(0))
      .withContext('InquiryFacadeService spy method userInquiry was called with params')
      .toEqual([userIdValue]);
  });
});
