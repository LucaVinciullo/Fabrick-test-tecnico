import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export abstract class AbstractSmartFacadeClass {
  subscription: Subscription | null = null;

  abstract clearObservables(): void;

  initSubscription() {
    if (!this.subscription) this.subscription = new Subscription();
  }

  clearSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
