import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  request<T>(method: 'get' | 'post', url: string, body: unknown = null): Observable<T> {
    this.initLoading();
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${environment.apiKey}`,
      }),
      ...(body ? { body } : null),
    };

    return this.httpClient.request<T>(method, `${environment.baseUrl}${url}`, options).pipe(
      map(response => {
        return response;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        this.sendErrorFeedback(
          Array.isArray(errorResponse?.error)
            ? errorResponse?.error.map(error => `${error?.field} ${error?.message}`).join(', ')
            : undefined,
        );
        return throwError(() => errorResponse);
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

  private sendErrorFeedback(errorMessage?: string) {
    this.notificationService.error('notifications.genericError', { error: errorMessage ?? '' });
  }
}
