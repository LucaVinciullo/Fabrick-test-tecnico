import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/services/http.service';
import {UserFormValue} from "src/app/feature-modules/registration/model/user-form-value.interface";

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpService: HttpService) { }

  registerUser(userForm: NonNullable<UserFormValue>): Observable<unknown> {
    return this.httpService.request('post', 'users', userForm);
  }

  inquiryUsers(): Observable<unknown> {
    return this.httpService.request('get', 'users');
  }
}
