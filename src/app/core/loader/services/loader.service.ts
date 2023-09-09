import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderCounterSubj$ = new BehaviorSubject<number>(0);

  private loaderCounter$ = this.loaderCounterSubj$.asObservable();

  isLoaderVisible$: Observable<boolean> = this.loaderCounter$.pipe(map(counter => counter > 0));

  incrementLoaderCounter() {
    this.loaderCounterSubj$.next(this.loaderCounterSubj$.value + 1);
  }

  /**
   * The purpose of the timeout is to smoothen the loading process in case of subsequent loading process,
   * otherwise the end of a loading and the immediate start of another one would make the loader flicker.
   */
  decrementLoaderCounter() {
    setTimeout(() => {
      this.loaderCounterSubj$.next(this.loaderCounterSubj$.value - 1);
    }, 250);
  }
}
