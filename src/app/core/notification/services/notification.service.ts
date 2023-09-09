import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar, private translateService: TranslateService) {
  }

  private notify(panelClass: string, i18nMessageKey: string, interpolateParams?: {
    [k: string]: string | number
  }) {
    this.snackBar.open(
      this.translateService.instant(i18nMessageKey, interpolateParams),
      undefined,
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        politeness: 'assertive',
        panelClass,
      });
  }

  info(i18nMessageKey: string, interpolateParams?: { [k: string]: string | number }) {
    this.notify('info-notification', i18nMessageKey, interpolateParams);
  }

  error(i18nMessageKey: string, interpolateParams?: { [k: string]: string | number }) {
    this.notify('error-notification', i18nMessageKey, interpolateParams);
  }
}
