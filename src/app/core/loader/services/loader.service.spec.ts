import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoaderService } from 'fab-core/loader/services/loader.service';
import { take } from 'rxjs/operators';

describe('LoaderService', () => {
  let service: LoaderService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LoaderService,
      ],
    });
    service = TestBed.inject(LoaderService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('it is correctly initialised', (done: DoneFn) => {
    expect(service).toBeTruthy();
    service.isLoaderVisible$.pipe(take(1)).subscribe({
      next: isLoaderVisible => {
        expect(isLoaderVisible)
          .withContext('loader counter is initialized to 0')
          .toEqual(false);
        done();
      },
    });
  });

  it('isLoaderVisible$ should be true when loader is greater than 0', (done: DoneFn) => {
    service.incrementLoaderCounter();

    service.isLoaderVisible$.pipe(take(1)).subscribe({
      next: isLoaderVisible => {
        expect(isLoaderVisible)
          .withContext('with 1 loading in progress, loader is visible')
          .toEqual(true);
        done();
      },
    });
  });

  it('isLoaderVisible$ becomes false only after a delay', fakeAsync(() => {
    service.incrementLoaderCounter();

    service.isLoaderVisible$.pipe(take(1)).subscribe({
      next: isLoaderVisible => {
        expect(isLoaderVisible)
          .withContext('loader is now visible')
          .toEqual(true);
      },
    });

    service.isLoaderVisible$.pipe(take(1)).subscribe({
      next: isLoaderVisible => {
        expect(isLoaderVisible)
          .withContext('it requires a short delay for loader to become no longer visible')
          .toEqual(true);
      },
    });

    service.decrementLoaderCounter();
    tick(300);

    service.isLoaderVisible$.pipe(take(1)).subscribe({
      next: isLoaderVisible => {
        expect(isLoaderVisible)
          .withContext('after a short delay, loader is no longer visible')
          .toEqual(false);
      },
    });
  }));
});
