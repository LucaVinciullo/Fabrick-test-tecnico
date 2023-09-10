import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from 'fab-core/http/services/http.service';
import { LoaderService } from 'fab-core/loader/services/loader.service';
import { NotificationService } from 'fab-core/notification/services/notification.service';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

describe('HttpService', () => {
  let service: HttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  const method = 'get';
  const url = 'mock-url';
  const options = undefined;

  beforeEach(() => {

    const httpSpy = jasmine.createSpyObj('HttpClient', ['request']);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['info', 'error']);
    const loaderSpy = jasmine.createSpyObj('LoaderService', ['incrementLoaderCounter', 'decrementLoaderCounter']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        HttpService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: LoaderService, useValue: loaderSpy },
      ],
    });
    service = TestBed.inject(HttpService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    loaderServiceSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('it is correctly initialised', () => {
    expect(service).toBeTruthy();
  });

  it('it manages loading', (done: DoneFn) => {
    const response = 'mock-response';
    httpClientSpy.request.and.returnValue(of(response));

    service.request(method, url, options).pipe(take(1)).subscribe({
      next: (httpResponse) => {
        expect(httpResponse)
          .withContext('expected response')
          .toEqual(response);
        done();
      },
      error: done.fail,
    });

    expect(loaderServiceSpy.incrementLoaderCounter.calls.count())
      .withContext('LoaderService spy method incrementLoaderCounter was called once')
      .toBe(1);
    expect(loaderServiceSpy.decrementLoaderCounter.calls.count())
      .withContext('LoaderService spy method incrementLoaderCounter was called once')
      .toBe(1);
  });

  it('it notifies errors', (done: DoneFn) => {
    const error = 'mock-error';
    const status = 404;
    const statusText = 'Not Found';
    const errorResponse = new HttpErrorResponse({
      error, status, statusText,
    });

    httpClientSpy.request.and.returnValue(throwError(() => errorResponse));

    service.request(method, url, options).pipe(take(1)).subscribe({
      next: () => done.fail('expected an error'),
      error: (e) => {
        expect(e.error).toEqual(error);
        expect(e.status).toEqual(status);
        expect(e.message).toContain(statusText);
        done();
      },
    });

    expect(notificationServiceSpy.error.calls.count())
      .withContext('NotificationService spy method error was called once')
      .toBe(1);
  });
});
