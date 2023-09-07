import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractSmartFacadeClass } from 'fab-shared/components/abstract/abstract-smart-facade.class';

@Component({
  template: '',
})
export abstract class AbstractSmartContainerClass implements OnDestroy {
  subscription = new Subscription();

  /**
   * If true, invokes methods in the facade service that clear subscriptions and reset observables.
   * If false persists container data
   * @abstract
   * @type {boolean}
   */
  abstract shouldClearStateOnDestroy: boolean;

  constructor(protected facade: AbstractSmartFacadeClass) {
    this.facade.initSubscription();
  }

  ngOnDestroy() {
    if (this.shouldClearStateOnDestroy) {
      this.facade.clearObservables();
    }
    this.facade.clearSubscription();
    this.subscription.unsubscribe();
  }
}
