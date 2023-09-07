import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractSmartContainerClass } from 'fab-shared/components/abstract/abstract-smart-container.class';
import { RegistrationFacadeService } from 'src/app/feature-modules/registration/services/registration.facade.service';
import { UserFormInterface } from 'src/app/feature-modules/registration/model/user-form.interface';
import { GenderType } from 'src/app/feature-modules/registration/model/gender.type';
import { StatusType } from '../../model/status.type';

@Component({
  selector: 'fab-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss'],
})
export class RegistrationContainerComponent extends AbstractSmartContainerClass implements OnDestroy {
  shouldClearStateOnDestroy = false;

  userForm$ = this.facade.userForm$;

  userForm = new FormGroup<UserFormInterface>({
    name: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
  });

  genderOptions: GenderType[] = [
    'non binary',
    'male',
    'female',
  ];

  statusOptions: StatusType[] = [
    'active',
    'inactive',
  ];

  constructor(override facade: RegistrationFacadeService) {
    super(facade);
    this.subscription?.add(
      this.userForm$.subscribe(userForm => {
        if (userForm) {
          this.userForm.patchValue(userForm);
        } else {
          this.userForm.reset();
        }
      }),
    );
  }

  userRegistration() {
    this.facade.userRegistration(this.userForm.getRawValue());
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.facade.persistForm(this.userForm.getRawValue());
  }

  protected readonly JSON = JSON;
}
