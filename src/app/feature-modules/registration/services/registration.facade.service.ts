import { Injectable } from '@angular/core';
import { UserApiService } from 'fab-core/api/services/user.api.service';
import { NotificationService } from 'fab-core/notification/services/notification.service';
import { UserFormValue } from 'fab-features/registration/model/user-form-value.interface';
import { AbstractSmartFacadeClass } from 'fab-shared/components/services/abstract-smart-facade.class';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFacadeService extends AbstractSmartFacadeClass {
  userFormSubject$ = new BehaviorSubject<UserFormValue | null>(null);

  userForm$ = this.userFormSubject$.asObservable();

  constructor(private userApiService: UserApiService, private notificationService: NotificationService) {
    super();
  }

  userRegistration(userFormValue: NonNullable<UserFormValue>) {
    this.subscription?.add(this.userApiService.registerUser(userFormValue).pipe(
      take(1),
      map((user) => {
        this.notificationService.info('registration.complete', { userId: user.id });
        this.userFormSubject$.next(null);
      }),
    ).subscribe());
  }

  persistForm(userFormValue: UserFormValue) {
    this.userFormSubject$.next(userFormValue);
  }

  clearObservables() {
    this.userFormSubject$.next(null);
  }
}
