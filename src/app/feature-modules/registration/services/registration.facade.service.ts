import { Injectable } from '@angular/core';
import {ɵFormGroupRawValue, ɵTypedOrUntyped} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AbstractSmartFacadeClass } from 'fab-shared/components/abstract/abstract-smart-facade.class';
import { UserApiService } from 'src/app/core/api/services/user.api.service';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { UserFormInterface } from 'src/app/feature-modules/registration/model/user-form.interface';

@Injectable()
export class RegistrationFacadeService extends AbstractSmartFacadeClass {

  userFormSubject$ = new BehaviorSubject<ɵFormGroupRawValue<UserFormInterface> | null>(null);

  userForm$ = this.userFormSubject$.asObservable();

  constructor(private userApiService: UserApiService, private notificationService: NotificationService) {
    super();
  }

  userRegistration(userFormValue: ɵFormGroupRawValue<UserFormInterface>) {
    this.subscription?.add(this.userApiService.registerUser(userFormValue).pipe(
      take(1),
      map(() => {
        this.notificationService.info('registration.complete');
        this.userFormSubject$.next(null);
      }),
    ).subscribe());
  }

  persistForm(userFormValue: ɵTypedOrUntyped<ɵFormGroupRawValue<UserFormInterface>>) {
    this.userFormSubject$.next(userFormValue);
  }

  clearObservables() {
    this.userFormSubject$.next(null);
  }
}
