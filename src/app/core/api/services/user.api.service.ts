import { Injectable } from '@angular/core';
import { User } from 'fab-core/api/model/user.interface';
import { HttpService } from 'fab-core/http/services/http.service';
import { UserFormValue } from 'fab-features/registration/model/user-form-value.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpService: HttpService) {
  }

  registerUser(userForm: NonNullable<UserFormValue>): Observable<User> {
    return this.httpService.request<User>('post', 'users', userForm);
  }

  inquiryUsers(): Observable<unknown> {
    return this.httpService.request('get', 'users');
  }
}
