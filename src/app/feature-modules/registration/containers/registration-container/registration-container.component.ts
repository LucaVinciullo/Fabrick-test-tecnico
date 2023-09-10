import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { GenderType } from 'fab-features/registration/model/gender.type';
import { StatusType } from 'fab-features/registration/model/status.type';
import { UserFormValue } from 'fab-features/registration/model/user-form-value.interface';
import { RegistrationFacadeService } from 'fab-features/registration/services/registration.facade.service';
import { AbstractSmartContainerClass } from 'fab-shared/components/abstract/abstract-smart-container.class';
import { ControlsOf } from 'fab-shared/model/controls-of.type';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'fab-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss'],
})
export class RegistrationContainerComponent extends AbstractSmartContainerClass {
  shouldClearStateOnDestroy = false;

  userForm$ = this.facade.userForm$;

  lastRegisteredUser$ = this.facade.lastRegisteredUser$;

  userForm: FormGroup<ControlsOf<UserFormValue>> = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    gender: new FormControl<GenderType | null>(null, [Validators.required]),
    status: new FormControl<StatusType | null>(null, [Validators.required]),
  });

  genderOptions: GenderType[] = [
    'male',
    'female',
  ];

  statusOptions: StatusType[] = [
    'active',
    'inactive',
  ];

  @ViewChild(MatTooltip) matTooltip: MatTooltip | null = null;

  constructor(override facade: RegistrationFacadeService, private clipboard: Clipboard) {
    super(facade);

    this.subscription.add(
      this.userForm$
        .subscribe(userForm => {
          if (userForm) {
            this.userForm?.patchValue(userForm, { emitEvent: false });
          } else {
            this.userForm?.reset();
          }
        }),
    );

    this.subscription.add(
      this.userForm?.valueChanges
        .pipe(debounceTime(500))
        .subscribe(() => this.facade.persistForm(this.userForm.getRawValue())),
    );
  }

  copyUserId(userId: number) {
    this.clipboard.copy(String(userId));
  }

  genderSelectClicked() {
    if (!this.matTooltip?._isTooltipVisible()) this.matTooltip?.show();
  }

  clearForm() {
    this.userForm?.reset();
  }

  userRegistration() {
    this.facade.userRegistration(this.userForm.getRawValue());
  }
}
