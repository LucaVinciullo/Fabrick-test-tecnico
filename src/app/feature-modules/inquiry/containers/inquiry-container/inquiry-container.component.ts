import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InquiryFacadeService } from 'fab-features/inquiry/services/inquiry.facade.service';
import { AbstractSmartContainerClass } from 'fab-shared/components/abstract/abstract-smart-container.class';
import { ControlsOf } from 'fab-shared/model/controls-of.type';

@Component({
  selector: 'fab-inquiry-container',
  templateUrl: './inquiry-container.component.html',
  styleUrls: ['./inquiry-container.component.scss'],
})
export class InquiryContainerComponent extends AbstractSmartContainerClass {
  shouldClearStateOnDestroy = false;

  users$ = this.facade.users$;

  idForm: FormGroup<ControlsOf<{ id: number | null }>> = new FormGroup({
    id: new FormControl<number | null>(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
  });

  get hasPatternError(): boolean {
    return !!this.idForm.controls.id.errors?.['pattern'];
  }

  constructor(override facade: InquiryFacadeService) {
    super(facade);
    this.subscription.add(
      this.idForm.controls.id.valueChanges.subscribe(() => {
        if (this.hasPatternError) this.idForm.controls.id.markAsTouched();
      }),
    );
  }

  inquiryUser() {
    const { value } = this.idForm.controls.id;
    if (value) this.facade.userInquiry(value);
  }
}
