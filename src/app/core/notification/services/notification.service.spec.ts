import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'fab-core/notification/services/notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  const i18nKey = 'fab.mock';

  beforeEach(() => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const translateSpy = jasmine.createSpyObj('TranslateService', ['instant']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: TranslateService, useValue: translateSpy },
      ],
    });
    service = TestBed.inject(NotificationService);
    matSnackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    translateServiceSpy.instant.and.callFake((arg) => arg);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('it is correctly initialised', () => {
    expect(service).toBeTruthy();
  });

  it('it translates notifications', () => {

    service.info(i18nKey, {});

    expect(translateServiceSpy.instant.calls.count())
      .withContext('TranslateService instant method instant was called once')
      .toBe(1);
    expect(translateServiceSpy.instant.calls.argsFor(0))
      .withContext('TranslateService instant method open was called with notification message')
      .toEqual([i18nKey, {}]);
  });

  it('notifies an info message', () => {
    service.info(i18nKey);

    expect(matSnackBarSpy.open.calls.count())
      .withContext('MatSnackBar spy method open was called once')
      .toBe(1);
    expect(matSnackBarSpy.open.calls.argsFor(0))
      .withContext('MatSnackBar spy method open was called with info appearance')
      .toEqual([
        i18nKey,
        undefined,
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          politeness: 'assertive',
          panelClass: 'info-notification',
        },
      ]);
  });

  it('notifies an error message', () => {
    service.error(i18nKey);

    expect(matSnackBarSpy.open.calls.count())
      .withContext('MatSnackBar spy method open was called once')
      .toBe(1);
    expect(matSnackBarSpy.open.calls.argsFor(0))
      .withContext('MatSnackBar spy method open was called with error appearance')
      .toEqual([
        i18nKey,
        undefined,
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          politeness: 'assertive',
          panelClass: 'error-notification',
        },
      ]);
  });
});
