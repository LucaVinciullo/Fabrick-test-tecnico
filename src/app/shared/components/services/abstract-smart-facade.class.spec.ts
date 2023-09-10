import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AbstractSmartFacadeClass } from 'fab-shared/components/services/abstract-smart-facade.class';
import { Subscription } from 'rxjs';

@Injectable()
export class MockFacadeClass extends AbstractSmartFacadeClass {
  clearObservables(): void {
  }
}

describe('AbstractSmartFacadeClass', () => {
  let service: MockFacadeClass;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockFacadeClass,
      ],
    });
    service = TestBed.inject(MockFacadeClass);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('it is correctly initialised', (done: DoneFn) => {
    expect(service).toBeTruthy();
    expect(service.subscription).toBe(null);
    done();
  });

  it('initSubscription creates a new subscription only if not present', (done: DoneFn) => {
    service.subscription = null;

    service.initSubscription();

    expect(service.subscription).not.toBeNull();
    done();
  });

  it('clearSubscription unsubscribes and assigns null to service subscription', (done: DoneFn) => {
    service.subscription = new Subscription();
    const spyOnUnsubscribe = spyOn(service.subscription, 'unsubscribe');

    service.clearSubscription();

    expect(service.subscription).toBeNull();
    expect(spyOnUnsubscribe).toHaveBeenCalledTimes(1);
    done();
  });
});
