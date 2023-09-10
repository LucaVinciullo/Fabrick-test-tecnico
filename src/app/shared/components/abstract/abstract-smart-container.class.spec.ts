import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractSmartContainerClass } from 'fab-shared/components/abstract/abstract-smart-container.class';
import { AbstractSmartFacadeClass } from 'fab-shared/components/services/abstract-smart-facade.class';


@Component({
  template: '',
})
class SmartContainerMockComponent extends AbstractSmartContainerClass {
  shouldClearStateOnDestroy = false;

  constructor(override facade: AbstractSmartFacadeClass) {
    super(facade);
  }
}

describe('AbstractSmartContainerClass', () => {
  let component: SmartContainerMockComponent;
  let fixture: ComponentFixture<SmartContainerMockComponent>;
  let facadeServiceSpy: jasmine.SpyObj<AbstractSmartFacadeClass>;

  beforeEach(() => {
    const facadeSpy = jasmine.createSpyObj('AbstractSmartFacadeClass', ['initSubscription', 'clearObservables', 'clearSubscription']);

    TestBed.configureTestingModule({
      declarations: [SmartContainerMockComponent],
      providers: [
        { provide: AbstractSmartFacadeClass, useValue: facadeSpy },
      ],
    });
    fixture = TestBed.createComponent(SmartContainerMockComponent);
    component = fixture.componentInstance;
    facadeServiceSpy = TestBed.inject(AbstractSmartFacadeClass) as jasmine.SpyObj<AbstractSmartFacadeClass>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(facadeServiceSpy.initSubscription.calls.count())
      .withContext('AbstractSmartFacade spy method initSubscription was called once')
      .toBe(1);
  });

  it('during OnDestroy lifecycle hook should clear both component and service subscriptions', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(facadeServiceSpy.clearSubscription.calls.count())
      .withContext('AbstractSmartFacade spy method clearSubscription was called once')
      .toBe(1);
    expect(facadeServiceSpy.clearObservables.calls.count())
      .withContext('AbstractSmartFacade spy method clearObservables was never called')
      .toBe(0);
    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('during OnDestroy lifecycle resets service state if shouldClearStateOnDestroy prop is true', () => {
    component.shouldClearStateOnDestroy = true;

    component.ngOnDestroy();

    expect(facadeServiceSpy.clearObservables.calls.count())
      .withContext('AbstractSmartFacade spy method clearObservables was called once')
      .toBe(1);
  });
});
