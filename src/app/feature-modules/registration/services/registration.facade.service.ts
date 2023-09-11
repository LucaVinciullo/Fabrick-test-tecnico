import { Injectable } from '@angular/core';
import { User } from 'fab-core/api/model/user.interface';
import { UserApiService } from 'fab-core/api/services/user.api.service';
import { UserFormValue } from 'fab-features/registration/model/user-form-value.interface';
import { AbstractSmartFacadeClass } from 'fab-shared/components/services/abstract-smart-facade.class';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFacadeService extends AbstractSmartFacadeClass {
  private userFormSubject$ = new BehaviorSubject<UserFormValue | null>(null);

  userForm$ = this.userFormSubject$.asObservable();

  private lastRegisteredUserSubj$ = new BehaviorSubject<User | null>(null);

  lastRegisteredUser$ = this.lastRegisteredUserSubj$.asObservable();

  constructor(private userApiService: UserApiService) {
    super();
  }

  userRegistration(userFormValue: NonNullable<UserFormValue>) {
    this.lastRegisteredUserSubj$.next(null);
    this.subscription?.add(this.userApiService.registerUser(userFormValue).pipe(
      take(1),
      map((user) => {
        this.userFormSubject$.next(null);
        this.lastRegisteredUserSubj$.next(user);
      }),
    ).subscribe());
  }

  persistForm(userFormValue: UserFormValue) {
    this.userFormSubject$.next(userFormValue);
  }

  clearObservables() {
    this.lastRegisteredUserSubj$.next(null);
    this.userFormSubject$.next(null);
  }
}
