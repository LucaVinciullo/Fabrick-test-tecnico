import { Injectable } from '@angular/core';
import { User } from 'fab-core/api/model/user.interface';
import { UserApiService } from 'fab-core/api/services/user.api.service';
import { NotificationService } from 'fab-core/notification/services/notification.service';
import { AbstractSmartFacadeClass } from 'fab-shared/components/services/abstract-smart-facade.class';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InquiryFacadeService extends AbstractSmartFacadeClass {
  usersSubject$ = new BehaviorSubject<{ [id: number]: User }>({});

  users$ = this.usersSubject$.asObservable();

  constructor(private userApiService: UserApiService, private notificationService: NotificationService) {
    super();
  }

  userInquiry(userId: number) {
    this.subscription?.add(this.userApiService.inquiryUsers(userId).pipe(
      take(1),
      map((user) => {
        this.usersSubject$.next({
          ...this.usersSubject$.value,
          [userId]: user,
        });
      }),
    ).subscribe());
  }

  clearObservables() {
    this.usersSubject$.next({});
  }
}
