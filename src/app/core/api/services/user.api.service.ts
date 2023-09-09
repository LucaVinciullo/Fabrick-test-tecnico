import { Injectable } from '@angular/core';
import { HttpService } from 'fab-core/http/services/http.service';
import { UserFormValue } from 'fab-features/registration/model/user-form-value.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpService: HttpService) {
  }

  registerUser(userForm: NonNullable<UserFormValue>): Observable<unknown> {
    return this.httpService.request('post', 'users', userForm);
  }

  inquiryUsers(): Observable<unknown> {
    return this.httpService.request('get', 'users');
  }
}
