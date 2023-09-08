import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AbstractSmartContainerClass } from 'fab-shared/components/abstract/abstract-smart-container.class';
import { RegistrationFacadeService } from 'src/app/feature-modules/registration/services/registration.facade.service';
import { GenderType } from 'src/app/feature-modules/registration/model/gender.type';
import { StatusType } from 'src/app/feature-modules/registration/model/status.type';
import { ControlsOf } from 'fab-shared/model/controls-of.type';
import { UserFormValue } from 'src/app/feature-modules/registration/model/user-form-value.interface';

@Component({
  selector: 'fab-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss'],
})
export class RegistrationContainerComponent extends AbstractSmartContainerClass implements OnDestroy {
  shouldClearStateOnDestroy = false;

  userForm$ = this.facade.userForm$;

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

  constructor(override facade: RegistrationFacadeService) {
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

  clearForm() {
    this.userForm?.reset();
  }

  userRegistration() {
    this.facade.userRegistration(this.userForm.getRawValue());
  }
}
