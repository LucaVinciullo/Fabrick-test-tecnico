import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../http/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpService: HttpService) { }

  registerUser(userForm: unknown): Observable<unknown> {
    return this.httpService.request('post', 'users', userForm);
  }

  inquiryUsers(): Observable<unknown> {
    return this.httpService.request('get', 'users');
  }
}
