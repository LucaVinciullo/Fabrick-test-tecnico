import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from 'fab-core/loader/services/loader.service';
import { NotificationService } from 'fab-core/notification/services/notification.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient, private loaderService: LoaderService, private notificationService: NotificationService) {
  }

  request(method: 'get' | 'post', url: string, body: unknown = null): Observable<unknown> {
    this.initLoading();
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${environment.apiKey}`,
      }),
      ...(body ? { body } : null),
    };

    return this.httpClient.request(method, `${environment.baseUrl}${url}`, options).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        this.sendErrorFeedback();
        return throwError(() => error);
      }),
      finalize(() => {
        this.stopLoading();
      }),
    );
  }

  private initLoading() {
    this.loaderService.incrementLoaderCounter();
  }

  private stopLoading() {
    this.loaderService.decrementLoaderCounter();
  }

  private sendErrorFeedback() {
    this.notificationService.error('notifications.genericError');
  }
}
