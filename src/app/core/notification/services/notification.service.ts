import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar, private translateService: TranslateService) { }

  private notify(i18nMessageKey: string, panelClass?: string | string[]) {
    this.snackBar.open(
      this.translateService.instant(i18nMessageKey),
      undefined,
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        politeness: 'assertive',
        panelClass,
      });
  }

  info(i18nMessageKey: string) {
    this.notify(i18nMessageKey, 'info-notification');
  }

  error(i18nMessageKey: string) {
    this.notify(i18nMessageKey, 'error-notification');
  }
}
